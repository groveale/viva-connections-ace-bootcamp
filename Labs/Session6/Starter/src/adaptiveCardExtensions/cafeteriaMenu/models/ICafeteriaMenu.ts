import { ICafeteriaMenuItem } from "./ICafeteriaMenuItem";

export interface ICafeteriaMenu {
    day: string;
    title: string;
    description: string;
    imageUrl: string;
    menuItems: ICafeteriaMenuItem[];
}