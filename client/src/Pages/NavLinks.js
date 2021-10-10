import {GrHomeRounded} from 'react-icons/gr'
import {GiTeacher, GiPapers, GiReceiveMoney} from 'react-icons/gi';
import {HiOutlineUsers} from 'react-icons/hi'

const NavLinks = [
    {
        id: 1,
        name: "Dashboard",
        path: "/dashboard",
        icons: <GrHomeRounded />
    },
    {
        id: 2,
        name: "Tutors",
        path: "/tutors",
        icons: <GiTeacher />
    },
    {
        id: 3,
        name: "Students",
        path: "/students",
        icons: <HiOutlineUsers />
    },
    {
        id: 4,
        name: "Exams",
        path: "/exams",
        icons: <GiPapers />
    },
    {
        id: 5,
        name: 'Fees',
        path: '/fees',
        icons: <GiReceiveMoney />
    },
    {
        id: 6,
        name: 'Users',
        path: '/users',
        icons: <HiOutlineUsers />
    }
];

export default NavLinks;