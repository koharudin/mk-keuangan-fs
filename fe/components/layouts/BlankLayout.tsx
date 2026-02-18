import { Outlet } from 'react-router-dom'
interface BlankLayoutProps {
    children: React.ReactNode;
}
const BlankLayout: React.FC<BlankLayoutProps> = ({ children }) => {
    return <>
        <Outlet />
    </>
}
export default BlankLayout