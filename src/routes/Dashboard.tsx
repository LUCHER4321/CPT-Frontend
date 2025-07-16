import { useEffect, useState } from "react";
import { dashboardItems } from "../data/dashboardItems";
import { Sidebar } from "../components/dashboard/Sidebar";
import { exampleUsers } from "../data/example";
import { getMe } from "../api/user";

export const Dashboard = () => {
    const [expanded, setExpanded] = useState(false);
    const [user, setUser] = useState(exampleUsers[0]);
    useEffect(() => {
        document.title = "Life Tree | Dashboard";
        getMe({}).then(u => setUser(u ?? exampleUsers[0]));
    }, []);
    return (
        <div className="size-full flex flex-row justify-start">
            <Sidebar
                expanded={expanded}
                items={dashboardItems}
                currentPage="/"
                user={user}
                onMouseEnter={() => setExpanded(true)}
                onMouseLeave={() => setExpanded(false)}
            />
        </div>
    )
};