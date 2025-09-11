import type { Species } from "chrono-phylo-tree";
import { TimeUnit } from "../../enums";
import type { PhTreeResponse, UserResponse } from "../../types"
import { nullableInput } from "../../utils/nullableInput";
import { AuthField } from "../auth/AuthField";
import { IconInput } from "../IconInput";
import { ToggleSwitch } from "../pricing/ToggleSwitch";
import { circleImage, aText } from "../../data/classNames";

interface TreeViewPropsProps {
    tree?: PhTreeResponse;
    user?: UserResponse;
    unit?: TimeUnit;
    setUnit?: (tu: TimeUnit) => void;
    chronoScale?: boolean;
    present?: boolean;
    setPresent?: (b: boolean) => void;
    presentTime?: number;
    setPresentTime?: (n: number) => void;
    commonAncestors?: Species[];
}

export const TreeViewProps = ({
    tree,
    user,
    unit = TimeUnit.Y,
    setUnit,
    chronoScale,
    present,
    setPresent,
    presentTime,
    setPresentTime,
    commonAncestors
}: TreeViewPropsProps) => {
    const apparition = Math.min(...commonAncestors?.map(ca => ca.apparition) ?? []);
    const extinction = Math.max(...commonAncestors?.map(ca => ca.absoluteExtinction()) ?? []);
    return (
        <>
            <h2 className={"font-bold text-xl mb-2"}>{tree?.name}</h2>
            {tree?.image && <img src={tree.image} className={"h-70! w-70! self-center mb-2 " + circleImage} />}
            <p className="mb-1">By: <a className={aText} href={`/profiles/${user?.id}`}>@{user?.username}</a></p>
            <p className="mb-2">{tree?.description}</p>
            <div className="flex flex-wrap space-x-2 w-full mb-6">
                {tree?.tags?.map((t, index) => (<div key={index} className="flex flex-row items-center mt-2 px-2 py-1 space-x-1 rounded-full dark:bg-[#1B5E20] bg-[#D8EDD9]">
                    <span>{t}</span>
                </div>))}
            </div>
            {chronoScale && <AuthField
                name="Time Unit"
                selected={unit}
                setSelected={setUnit}
                options={[TimeUnit.Y, TimeUnit.KY, TimeUnit.MY, TimeUnit.BY, TimeUnit.TY]}
                optionsDisplay={tu => {
                    switch(tu) {
                        case TimeUnit.Y: return "Years"
                        case TimeUnit.KY: return "Thousand Years"
                        case TimeUnit.MY: return "Million Years"
                        case TimeUnit.BY: return "Billion Years"
                        case TimeUnit.TY: return "Trillion Years"
                    }
                }}
            />}
            {chronoScale && <div className="flex flex-col">
                <div className="flex flex-row justify-between mb-2">
                    <p className="font-bold">Present Time</p>
                    <ToggleSwitch
                        id="present-time"
                        className={"w-15 h-7.5 " + (present ? "bg-[#D8EDD9] dark:bg-[#1B5E20]" : "bg-neutral-200 dark:bg-neutral-700")}
                        spanClassName="bg-white"
                        checked={present}
                        onChange={setPresent}
                    />
                </div>
                {present && <IconInput
                    className="pl-[1rem] py-[0.8rem] border rounded w-full"
                    type="number"
                    value={nullableInput(presentTime, pt => pt / unit)?.toString()}
                    setValue={pt => setPresentTime?.(+pt * unit)}
                    min={apparition / unit}
                    max={extinction / unit}
                />}
                {present && <IconInput
                    type="range"
                    className="w-full"
                    min={apparition / unit}
                    max={extinction / unit}
                    value={nullableInput(presentTime, pt => pt / unit)?.toString()}
                    setValue={pt => setPresentTime?.(+pt * unit)}
                />}
            </div>}
        </>
    )
}