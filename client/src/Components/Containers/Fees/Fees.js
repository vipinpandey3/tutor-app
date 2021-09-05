import { Grid, makeStyles, Paper, Toolbar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Text from '../../Common/Text'
import FeesTable from './FeesTable';
import Button from '../../Common/Button'
import MatButton from '../../Common/Button';
import FeesForm from './FeesForm';
import Input from '../../Common/Input';

const useStyles = makeStyles((theme) => ({
    paperContent: {
        margin: theme.spacing(4),
        padding: theme.spacing(3)
    },
    seachInput: {
        // padding: "5px 10px",
        // height: "20px",
        // marginTop: "10px"
    }
}))

const feesTableHeader = [
    {
        id: "studentId",
        label: "Student Id",
        avatar: false
    },
    {
        id: 'studentName',
        label: "Student Name",
        avatar: false
    },
    {
        id: "feesAmount",
        label: "Fees amount",
        className: "greenBackground",
        avatar: true
    },
    {
        id: 'discountAmount',
        label: "Discount amount",
        className: "redBackground",
        avatar: true
    },
    {
        id: "finalAmount",
        label: "Final Amount",
        avatar: false
    },
    {
        id: "recievedAmount",
        label: "Recieved Amount",
        
    },
    {
        id: "refundAmount",
        label: 'Refund Amount',
        className: "blueBackground",
        avatar: true
    },
    {
        id: "pendingAmount",
        label: 'Pending Amount',
        avatar: false
    },
]

let feesData = [
    {
        studentId: '120',
        studentName: "Vipin Pandey",
        feesAmount: '50000.00',
        discountAmount: "5000.00",
        discount: '5',
        finalAmount: "45000.00",
        recievedAmount: "20000.00",
        refundAmount: "0.00",
        pendingAmount: "25000.00"
    },
    {
        studentId: '121',
        studentName: "Vipin Pandey",
        feesAmount: '50000.00',
        discountAmount: "5000.00",
        finalAmount: "45000.00",
        recievedAmount: "20000.00",
        refundAmount: "0.00",
        pendingAmount: "25000.00",
        discount: '5',
    },
    {
        studentId: '122',
        studentName: "Vipin Pandey",
        feesAmount: '50000.00',
        discountAmount: "5000.00",
        discount: '5',
        finalAmount: "45000.00",
        recievedAmount: "20000.00",
        refundAmount: "0.00",
        pendingAmount: "25000.00"
    },
    {
        studentId: '123',
        studentName: "Vipin Pandey",
        feesAmount: '50000.00',
        discountAmount: "5000.00",
        finalAmount: "45000.00",
        recievedAmount: "20000.00",
        refundAmount: "0.00",
        pendingAmount: "25000.00",
        discount: '5',
    },
    {
        studentId: '124',
        studentName: "Vipin Pandey",
        feesAmount: '50000.00',
        discountAmount: "5000.00",
        finalAmount: "45000.00",
        recievedAmount: "20000.00",
        refundAmount: "0.00",
        pendingAmount: "25000.00",
        discount: '5',
    },
    {
        studentId: '125',
        studentName: "Vipin Pandey",
        feesAmount: '50000.00',
        discountAmount: "5000.00",
        finalAmount: "45000.00",
        recievedAmount: "20000.00",
        refundAmount: "0.00",
        pendingAmount: "25000.00",
        discount: '5'
    }
]

const feesInput = [
    {
        id: "studentId",
        name: "studentId",
        label: "Student Id",
        type: 'input'
    },
    {
        id: "studentName",
        name: "studentName",
        label: "Student Name",
        type: 'input'
    },
    {
        id: "feesAmount",
        name: "feesAmount",
        label: "Fees Amount",
        type: 'input'
    },
    {
        id: "discount",
        name: "discount",
        label: "Discount %",
        type: 'input'
    },
    {
        id: "recievedAmount",
        name: "recievedAmount",
        label: "Recieved Amount",
        type: 'input'
    },
    {
        id: "refundAmount",
        name: "refundAmount",
        label: "Refund Amount",
        type: 'input'
    },
    {
        id: 'date',
        name: 'date',
        label: "Date",
        type: 'date'
    }
]

const initiateFeesFormValue = {
    studentId: '',
    studentName: '',
    feesAmount: '',
    discount: '',
    // finalAmount: s'',
    recievedAmount: '',
    refundAmount: '',
    date: new Date().toISOString().slice(0, 10), 
}

const Fees = () => {
    const styles = useStyles()
    const [showFeesForm, setShowFeesForm] = useState(false);
    const [searchValue, setSearchValue] = useState('')
    const [feesPaidData, setFeesPaidData] = useState([])
    const [formValue, setFormValue] = useState(initiateFeesFormValue)

    const hadleFeesForm = () => {
        setShowFeesForm(true);
    }

    const getFeesFormValue = (value) => {
        value.finalAmount = parseInt(value.feesAmount) - (parseInt(value.discount)/100 * parseInt(value.feesAmount))
        value.pendingAmount = parseInt(value.finalAmount) - parseInt(value.recievedAmount)
        console.log('value', value);
        setFeesPaidData([...feesPaidData, value])
        setShowFeesForm(false);
    }

    const searchPaidFees = (e) => {
        setSearchValue(e.target.value)
    }

    useEffect(() => {
        console.log("value, ", typeof(parseInt(searchValue)));
        if(searchValue) {
            const newData = feesData.filter(data => {
                console.log('Log', data);
                if(parseInt(searchValue) === parseInt(data.studentId) || data.studentName.includes(searchValue) ) {
                    return data
                }
            })
            setFeesPaidData(newData)
        } else {
            setFeesPaidData(feesData)
        }
    }, [searchValue])

    const downloadReciept = (data) => {
        console.log("Download Data", data);
    }

    const editFees = (data) => {
        console.log("Edit Data", data);
        setShowFeesForm(true);
        setFormValue(data);
    };

    const deleteFees = (data) => {
        const newArray = feesData.filter(objValue => {
                return objValue.studentId !== data.studentId
        });

        setFeesPaidData(newArray);
    }

    return (
        <>
            {showFeesForm && <FeesForm formTitle="Fees Details" getFeesFormValue={getFeesFormValue} feesInput={feesInput} initiateFeesFormValue={formValue} />}
            <Paper className={styles.paperContent}>
                <Grid container>
                    <Grid item xs={3}>
                        <Text variable="subtitle1" component="subtitle1">Fees</Text>
                    </Grid>
                    <Grid item sm></Grid>
                    <Grid item xs={3}>
                        <Toolbar>
                            <Input className={styles.seachInput} style={{width: '90%'}} onChange={searchPaidFees} value={searchValue} name="paidFees" label="Paid Fees" />
                        </Toolbar>
                        {/* <input className={styles.seachInput} onChange={searchPaidFees} value={paidFees} name="paidFees" placeholder="Search"  /> */}
                    </Grid>
                    <Grid item xs={2}>
                        <MatButton onClick={hadleFeesForm} variant="contained" style={{ flex: "1", width: "90%" }}>Fees</MatButton>
                    </Grid>
                </Grid>
                <FeesTable downloadReciept={downloadReciept} deleteFees={deleteFees} editFees={editFees} feesTableHeader={feesTableHeader} FeesData={feesPaidData} />
            </Paper>
        </>
    )
}

export default Fees
