import { useEffect, useState } from "react";
import { dashboardItems } from "../data/dashboardItems";
import { Sidebar } from "../components/dashboard/Sidebar";
import { exampleUsers } from "../data/example";
import { getMe } from "../api/user";
import { Header } from "../components/dashboard/Header";

export const Dashboard = () => {
    const [expanded, setExpanded] = useState(false);
    const [user, setUser] = useState(exampleUsers[0]);
    const [search, setSearch] = useState("");
    useEffect(() => {
        document.title = "Life Tree | Dashboard";
        getMe({}).then(u => setUser(u ?? exampleUsers[0]));
    }, []);
    return (
        <div className="size-full flex flex-row justify-start">
            <Sidebar
                expanded={expanded}
                setExpanded={setExpanded}
                items={dashboardItems}
                currentPage="/"
                user={user}
            />
            <main className="flex flex-col w-full">
                <Header
                    search={search}
                    setSearch={setSearch}
                    count={10}
                />
            </main>
        </div>
    )
};