import { useCallback, useEffect, useState } from "react";
import { Sidebar } from "../../components/dashboard/Sidebar"
import { dashboardItems } from "../../data/dashboardItems"
import type { NotificationResponse, UserResponse } from "../../types";
import { deleteApiKey, deleteMe, deletePhotoMe, getMe, newApiKey, photoMe, token, updateMe } from "../../api/user";
import { Header } from "../../components/dashboard/Header";
import { getNotifications } from "../../api/notification";
import { notificationService } from "../../classes/NotificationService";
import { title, unborder } from "../../data/classNames";
import { SettingsSection } from "../../components/dashboard/settings/SettingsSection";
import { useDropzone } from "react-dropzone";
import { ImageProp } from "../../components/dashboard/trees/ImageProp";
import { nullableInput } from "../../utils/nullableInput";
import { AuthField } from "../../components/auth/AuthField";
import { Role } from "../../enums";
import { useNavigate } from "react-router-dom";

export const Settings = () => {
    const [expanded, setExpanded] = useState(false);
    const [user, setUser] = useState<UserResponse | undefined>(undefined);
    const [username, setUsername] = useState<string>("");
    const [description, setDescription] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [notifications, setNotifications] = useState<NotificationResponse[]>([]);
    const [search, setSearch] = useState("");
    const [active, setActive] = useState(false);
    const [visiblePassword, setVisiblePassword] = useState(false);
    const [visibleKeys, setVisibleKeys] = useState(false);
    const history = useNavigate();
    const onDrop = useCallback((files?: File[]) => {
        const [image] = files ?? [undefined];
        if (!image) return;
        photoMe({ image }).then(setUser);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    useEffect(() => {
        document.title = `Life Tree | Settings`;
        getMe({}).then(u => {
            setUser(u);
            setUsername(u?.username ?? "");
            setDescription(u?.description ?? "");
            getNotifications({}).then(n => {
                setNotifications(n ?? []);
            });
            notificationService.initialize({
                response: nr => setNotifications([nr, ...notifications]),
                userId: u?.id ?? ""
            });
        });
        token({ expiresIn: "7d" });
    }, []);
    return (
        <div className="size-full flex flex-col-reverse sm:flex-row justify-between h-screen sm:justify-start relative">
            <Sidebar
                expanded={expanded}
                setExpanded={setExpanded}
                items={dashboardItems}
                currentPage="/settings"
                user={user}
            />
            <main className="flex flex-col w-full h-full top-0 absolute sm:relative">
                <Header
                    search={search}
                    setSearch={setSearch}
                    notifications={notifications}
                    setNotifications={setNotifications}
                    active={active}
                    setActive={setActive}
                >
                    <h1 className={"block text-[2em]! font-bold " + title}>Settings</h1>
                </Header>
                <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 p-10 sm:gap-10 overflow-y-scroll">
                    <SettingsSection
                        icon="fa-user"
                        name="Profile"
                    >
                        <ImageProp
                            title="Profile Picture"
                            image={user?.photo}
                            getRootProps={getRootProps}
                            getInputProps={nullableInput(getInputProps, g => props => g({
                                accept: [".jpg", ".jpeg", ".png", ".gif", ".svg"].join(),
                                multiple: false,
                                ...props
                            }))}
                            isDragActive={isDragActive}
                            text={user?.photo ? "Update Profile Picture" : "Upload Profile Picture"}
                        />
                        <button onClick={() => {
                            if(confirm("Are you sure you want to delete your profile picture?")) deletePhotoMe({}).then(setUser);
                        }} className={"mb-8 bg-red-400! dark:bg-red-600! hover:bg-red-500! " + unborder}>
                            <i className="fas fa-trash"/> Delete
                        </button>
                        <AuthField
                            name="Username"
                            type="text"
                            placeholder="Username"
                            value={username}
                            setValue={setUsername}
                            setIcon
                            icon="fa-save"
                            onClick={() => {
                                if(confirm("Are you sure you wanna change your username?")) updateMe({ username }).then(u => {
                                    if(u?.message) alert(u.message);
                                    setUser(u);
                                    setUsername(u?.username ?? "");
                                });
                            }}
                        />
                        <AuthField
                            name="Description"
                            textArea
                            placeholder="Description"
                            value={description}
                            setValue={setDescription}
                            setIcon
                            icon="fa-save"
                            onClick={() => updateMe({ description }).then(u => {
                                setUser(u);
                                setUsername(u?.description ?? "");
                            })}
                        />
                    </SettingsSection>
                    <SettingsSection
                        icon="fa-shield-alt"
                        name="Security"
                    >
                        <AuthField
                            name="Current Password"
                            type={visiblePassword ? "text" : "password"}
                            id="current-password"
                            placeholder="••••••••"
                            value={oldPassword}
                            setValue={setOldPassword}
                            visiblePassword={visiblePassword}
                            setVisiblePassword={setVisiblePassword}
                        />
                        <AuthField
                            name="New Password"
                            type={visiblePassword ? "text" : "password"}
                            id="new-password"
                            placeholder="••••••••"
                            value={password}
                            setValue={setPassword}
                            visiblePassword={visiblePassword}
                            setVisiblePassword={setVisiblePassword}
                        />
                        <AuthField
                            name="Confirm New Password"
                            type={visiblePassword ? "text" : "password"}
                            id="confirm-new-password"
                            placeholder="••••••••"
                            value={confirmPassword}
                            setValue={setConfirmPassword}
                            visiblePassword={visiblePassword}
                            setVisiblePassword={setVisiblePassword}
                        />
                        <button onClick={() => {
                            if (password === confirmPassword && confirm("Are you sure you want to change your password?")) updateMe({ oldPassword, password }).then(setUser);
                        }} className={"mb-8 bg-green-400! dark:bg-green-600! hover:bg-green-500! " + unborder}>
                            <i className="fas fa-key"/> Change Password
                        </button>
                    </SettingsSection>
                    {user?.role !== Role.USER && <SettingsSection
                        icon="fa-key"
                        name="API Keys"
                        className="sm:col-span-2"
                    >
                        <div className="flex flex-row justify-between mb-6">
                            <div className="flex flex-row mb-[1rem]">
                                <h3 className={"text-lg mr-2 " + title}>My API Keys</h3>
                                <button onClick={() => setVisibleKeys(!visibleKeys)} className={"bg-black/0! p-0! flex items-center " + unborder}>
                                    <i className={`fas ${visibleKeys ? "fa-eye" : "fa-eye-slash"}`}/>
                                </button>
                            </div>
                            <button
                                className={"bg-green-400! dark:bg-green-600! hover:bg-green-500! " + unborder}
                                onClick={() => newApiKey({}).then(key => {
                                    const { apiKey } = key ?? {};
                                    if(!apiKey) return;
                                    if(!user) return;
                                    const { apiKeys, ...u } = user;
                                    setUser({ ...u, apiKeys: [apiKey, ...apiKeys ?? []] });
                                })}
                            >
                                <i className="fas fa-plus"/> Generate New API Key
                            </button>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {user?.apiKeys?.map((key, index) => <div key={index} className="w-full flex flex-row justify-between border p-4 rounded items-center">
                                <p>{visibleKeys ? key : key.split("").map(() => "•")}</p>
                                <button onClick={() => {
                                    if(confirm("Are you sure you want to delete this API Key?")) deleteApiKey({ keyToDelete: key }).then(setUser);
                                }} className={"bg-red-400! dark:bg-red-600! hover:bg-red-500! " + unborder}>
                                    <i className="fas fa-trash"/> Delete
                                </button>
                            </div>)}
                        </div>
                    </SettingsSection>}
                    <SettingsSection
                        icon="fa-cog"
                        name="Account"
                        className="sm:col-span-2"
                        bodyClassName="border-l-4 border-solid border-red-400 dark:border-red-600"
                    >
                        <h3 className="text-lg mr-2 font-bold text-red-400 dark:text-red-600">Dangerous Zone</h3>
                        <p className="mb-6">These actions cannot be undone. Please proceed with caution.</p>
                        <button onClick={() => {
                            if(confirm("This action will permanently delete your account and all your data. Are you sure?")) deleteMe({}).then(() => history("/"));
                        }} className={"bg-red-400! dark:bg-red-600! hover:bg-red-500! " + unborder}>
                            <i className="fas fa-trash"/> Delete your account permanently
                        </button>
                    </SettingsSection>
                </div>
            </main>
        </div>
    )
}