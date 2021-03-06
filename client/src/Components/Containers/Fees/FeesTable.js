import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, makeStyles } from '@material-ui/core'
import React from 'react';
import { green, red, blue } from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/Delete';
import GetAppIcon from '@material-ui/icons/GetApp';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  greenBackground: {
    color: "#fff",
    backgroundColor: green[500],
    "&.MuiAvatar-rounded": {
      padding: "0 5px",
      width: "auto",
      margin: "0 5px",
      borderRadius: "15px",
      fontSize: "14px",
    },
  },
  redBackground: {
    color: "#fff",
    backgroundColor: red[500],
    "&.MuiAvatar-rounded": {
      padding: "0 10px",
      width: "auto",
      margin: "0 5px",
      borderRadius: "15px",
      fontSize: "14px",
    },
  },
  blueBackground: {
    color: "#fff",
    backgroundColor: blue[500],
    "&.MuiAvatar-rounded": {
      padding: "0 10px",
      width: "auto",
      margin: "0 5px",
      borderRadius: "15px",
      fontSize: "14px",
    },
  },
  blueIcon: {
    "&.MuiSvgIcon-root": {
      color: "blue",
    },
  },
  greenIcon: {
    "&.MuiSvgIcon-root": {
      color: "green",
    },
  },
  redIcon: {
    "&.MuiSvgIcon-root": {
      color: "red",
    },
  },
}));

const FeesTable = (props) => {
  const styles = useStyles();
  const { feesTableHeader, FeesData, downloadReciept, editFees, deleteFees } =
    props;
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {feesTableHeader.length > 0 ? (
              feesTableHeader.map((cellValue, index) => (
                <TableCell key={index}>{cellValue.label}</TableCell>
              ))
            ) : (
              <p>Row Header</p>
            )}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {FeesData.length > 0 ? (
            FeesData.map((data) => {
              return (
                <TableRow hover key={data.uuid}>
                  {feesTableHeader.map((rowCell, index) => {
                    const value = data[rowCell.id];
                    if (rowCell.avatar) {
                      return (
                        <TableCell key={index}>
                          <Avatar
                            variant="rounded"
                            className={styles[rowCell.className]}
                          >
                            {value}
                          </Avatar>
                        </TableCell>
                      );
                    } else {
                      return <TableCell key={index}>{value}</TableCell>;
                    }
                  })}
                  <TableCell>
                    <DeleteIcon
                      onClick={() => deleteFees(data)}
                      className={styles.redIcon}
                    />
                    <GetAppIcon
                      onClick={() => downloadReciept(data)}
                      className={styles.greenIcon}
                    />
                    <EditIcon
                      onClick={() => editFees(data)}
                      className={styles.blueIcon}
                    />
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <p>No Data FOund</p>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FeesTable;
