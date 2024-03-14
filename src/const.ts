export type TCity = {
    label: string,
    value: string
}

export const cities: TCity[] = [
    {
        label: 'Riga',
        value: 'riga'
    },
    {
        label: 'Daugavpils',
        value: 'daugavpils'
    },
    {
        label: 'Jūrmala',
        value: 'jūrmala'
    },
    {
        label: 'Ventspils',
        value: 'ventspils'
    },
];
export type citiesType = (typeof cities)[number]['label'];
