import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React from 'react'

const UserTable = (props) => {
    const {attributes, userData} = props
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        {
                            attributes.length > 0 ? (
                                attributes.map((cellAttributes, index) => {
                                    return <TableCell key={cellAttributes.id}>{cellAttributes.label}</TableCell>
                                })
                            ) : (
                                <p>Row Header</p>
                            )
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        userData.length > 0 ? (
                            userData.map((data) => {
                                return (
                                    <TableRow key={data.id}>
                                        {attributes.map((cellAttributes, index) => {
                                                const value = data[cellAttributes.id];
                                                return <TableCell key={index}>{value}</TableCell>
                                            })}
                                    </TableRow>
                                )
                            })
                        ) : (
                            <TableRow>No User Found</TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default UserTable