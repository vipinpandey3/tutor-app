import PersonAddAltSharpIcon from '@mui/icons-material/PersonAddAltSharp';
import RateReviewTwoToneIcon from '@mui/icons-material/RateReviewTwoTone';

export const StudentDetailTabs = [
    {
      label: "Fees",
      id: 0
    },
    {
      label: "Attendence",
      id: 1
    }
]

export const initialExamFormValue = {
  examType: "",
  timeStart: "10.00",
  examDate: new Date(),
  academicYear: "",
  marks: "",
  standard: "",
  subjects: [],
  hours: 1
}

export const studentTableButtons = [
  {
    type: "mapStudent",
    name: "Map Standards",
    icon: <PersonAddAltSharpIcon />,
    id: 1
  }
]

export const classStudentsIcons = [
  {
    type: "mapStudent",
    name: "Map Standards",
    icon: <RateReviewTwoToneIcon />,
    id: 1
  }
]