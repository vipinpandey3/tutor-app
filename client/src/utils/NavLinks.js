
// import {GrHomeRounded} from 'react-icons/gr'
import {GiTeacher, GiPapers, GiReceiveMoney} from 'react-icons/gi';
import {HiHome, HiOutlineUsers} from 'react-icons/hi'

const NavLinks = [
    {
        id: 1,
        name: "Dashboard",
        path: "/dashboard",
        icons: <HiHome />,
        roles: [1,2]
    },
    {
        id: 2,
        name: "Tutors",
        path: "/tutors",
        icons: <GiTeacher />,
        roles: [1]
    },
    {
        id: 3,
        name: "Students",
        path: "/students",
        icons: <HiOutlineUsers />,
        roles: [1,2]
    },
    {
        id: 4,
        name: "Exams",
        path: "/exams",
        icons: <GiPapers />,
        roles: [1,2]
    },
    {
        id: 5,
        name: 'Fees',
        path: '/fees',
        icons: <GiReceiveMoney />,
        roles: [1]
    },
    {
        id: 6,
        name: 'Users',
        path: '/users',
        icons: <HiOutlineUsers />,
        roles: [1]
    }
];

export default NavLinks;