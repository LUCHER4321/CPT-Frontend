import { Order, TreeCriteria } from "../../enums";
import type { SearchProps } from "../../types";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import { AuthField } from "../auth/AuthField";
import { IconInput } from "../IconInput";

interface SearchHeaderProps {
    sProps?: SearchProps;
    setSearchProps?: (sp: SearchProps) => void;
    treesCount?: number;
}

export const SearchHeader = ({
    sProps,
    setSearchProps,
    treesCount = 0
}: SearchHeaderProps) => {
    const pages = Math.max(Math.ceil(treesCount / (sProps?.limit ?? 10)), 1);
    return (
        <div className="flex flex-wrap p-3 space-x-3 w-full justify-between">
            <AuthField
                name="Sort by:"
                className="space-x-3 items-center"
                selected={sProps?.criteria ?? TreeCriteria.UPDATED_AT}
                options={Object.values(TreeCriteria)}
                optionsDisplay={tc => {
                    switch(tc) {
                        case TreeCriteria.CREATED_AT: return "Creation Date"
                        case TreeCriteria.UPDATED_AT: return "Last Update"
                        default: return capitalizeFirstLetter(tc)
                    }
                }}
                setSelected={tc => {
                    const { criteria, ...sp} = sProps ?? {};
                    setSearchProps?.({
                        criteria: tc,
                        ...sp
                    });
                }}
                row
            >
                <IconInput
                    className="px-[1rem] py-[0.8rem] border rounded w-full"
                    selected={sProps?.order ?? Order.DESC}
                    options={Object.values(Order)}
                    optionsDisplay={o => {
                        switch(o) {
                            case Order.ASC: return "Ascendant"
                            case Order.DESC: return "Descendant"
                        }
                    }}
                    setSelected={o => {
                        const { order, ...sp } = sProps ?? {};
                        setSearchProps?.({
                            order: o,
                            ...sp
                        });
                    }}
                />
            </AuthField>
            <div className="flex flex-wrap space-x-3">
                <AuthField
                    row
                    name="Since:"
                    className="space-x-3 items-center justify-between"
                    type="date"
                    value={sProps?.from?.toDateString()}
                    setValue={f => {
                        const { from, ...sp } = sProps ?? {};
                        setSearchProps?.({
                            from: new Date(f),
                            ...sp
                        })
                    }}
                />
                <AuthField
                    row
                    name="Until:"
                    className="space-x-3 items-center justify-between"
                    type="date"
                    value={sProps?.to?.toDateString()}
                    setValue={t => {
                        const { to, ...sp } = sProps ?? {};
                        setSearchProps?.({
                            to: new Date(t),
                            ...sp
                        })
                    }}
                />
            </div>
            <div className="flex flex-wrap space-x-3">
                <AuthField
                    row
                    name="Results:"
                    className="space-x-3 items-center"
                    selected={sProps?.limit ?? 10}
                    options={[10, 20, 25, 50]}
                    optionsDisplay={l => l.toString()}
                    setSelected={l => {
                        const { limit = 10, page = 0, ...sp } = sProps ?? {};
                        setSearchProps?.({
                            limit: l,
                            page: Math.floor(page * limit / l),
                            ...sp
                        });
                    }}
                />
                <AuthField
                    row
                    name="Page:"
                    className="space-x-3 items-center"
                    selected={(sProps?.page ?? 0) + 1}
                    options={[...Array(pages).keys()]}
                    optionsDisplay={p => (p + 1).toString()}
                    setSelected={p => {
                        const { page, ...sp } = sProps ?? {};
                        setSearchProps?.({
                            page: p,
                            ...sp
                        });
                    }}
                />
            </div>
        </div>
    );
};