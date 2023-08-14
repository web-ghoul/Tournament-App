import React, { useState } from 'react'
import {Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Typography} from "@mui/material"
import styles from "./PointsTable.module.css"
import { FirstPage, KeyboardArrowLeft, KeyboardArrowRight, LastPage} from '@mui/icons-material';
import { useTheme } from '@emotion/react';
import { Link } from 'react-router-dom';
import {useSelector} from "react-redux";
import avatarImg from "../../../static/images/avatar.jpg"

//Function to Handle and Control Pages Change
function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <Box className={`${styles.actions}`} sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <FirstPage /> : <LastPage />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPage /> : <LastPage />}
        </IconButton>
      </Box>
    );
}

const PointsTable = ({data}) => {
    const {username} = useSelector((state)=>state.auth)

    const createData=(...args)=> {
      let row = {name: args[0]  ,points:args[args.length-1]};
      args.slice(1,args.length-1).map((round,i)=>row[`round${i+1}`] = round)
      return row
    }
    
    //Handle Round Number Of Table From Data of Tournament
    let rounds = []
    new Array(data.length-1).fill(1).map((n,i)=>rounds.push({id:`round${i+1}`, label:`round ${i+1}`, minWidth:100}))

    //Handle Columns Of Table From Data of Tournament
    const columns = [
      { id: 'player', label: 'Player', minWidth: 200 },
      ...rounds,
      { id: 'points', label: 'Points', minWidth: 100, align:"center" },
    ];

    //Handle Rows Of Table From Data of Tournament
    const rows = []
    data.map((player)=>rows.push(createData(player.Name ,...Array.from({length: player.Matches.length}, (_, i) => {
      const result = player.Matches[i].winner
      return result === "*" ? "-" : result === player.Name ? 2 : result==="draw"?1:0
    }) , player.Points)))
    rows.sort((a, b) => (a.points > b.points ? -1 : 1));

    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    return (
      <TableContainer className={`${styles.table_contain}`} component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              {columns.map((column,i) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <Typography variant='h5' className={`${i > 0 && i < columns.length-1 && "tac"}`}>{column.label}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
              {
                (rowsPerPage > 0
                  ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : rows
                ).map((row,i) => {
                  return(
                  <TableRow className={`${styles.table_cells} ${row.name === username && styles.active}`} key={row.name}>
                      <TableCell key={i} className={`flex-start ${styles.player}`} component="th" scope="row">
                        <Box className={`flex-center ${i+1 === 1 && styles.first} ${styles.player_photo}`}>
                          <Box alt = {"avatar"} component = {"img"} src = {avatarImg}/>
                        </Box>
                        <Link className={`${styles.player_name}`} to={`/profile/${row.name}`}>
                          {row.name}
                        </Link>
                      </TableCell>
                      {
                        Object.keys(row).map((key,x)=>{
                          return key.startsWith("round") && (
                            <TableCell key={x*2} style={{ width: 160 }} align="center" className={`tac`}>
                              {
                                <Button onClick={()=>window.open(data[i].Matches[x-2].gameLink ,"_blank")} className={`${styles.round_point}`}>{row[key]}</Button>
                              }
                            </TableCell>
                          )
                        })
                      }
                      <TableCell style={{ width: 160 }} align="center">
                        {row.points}
                      </TableCell>
                  </TableRow>
                  )
                })
              }
              {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
              </TableRow>
              )}
          </TableBody>
          {
            rows.length >= 5 && (
              <TableFooter>
                  <TableRow>
                    <TablePagination
                        rowsPerPageOptions={rows.length >= 5 ? [5, { label: 'All', value: -1 }] : rows.length >=10 ? [5,10, { label: 'All', value: -1 }] : rows.length >= 25 && [5,10,25, { label: 'All', value: -1 }]}
                        colSpan={columns.length}
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                        inputProps: {
                            'aria-label': 'rows per page',
                        },
                        native: true,
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
              </TableFooter>
            )
          }
        </Table>
      </TableContainer>
    )
}

export default PointsTable
