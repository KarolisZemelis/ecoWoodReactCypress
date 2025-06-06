export const formSchema = [
    { label: 'Vardas', name: 'firstName', type: 'text', required: true },

    { label: 'Amžius', name: 'age', type: 'number', required: true },

    {
        label: 'Lytis',
        name: 'gender',
        type: 'select',
        options: ['Vyras', 'Moteris', 'Kita'],
        required: true
    },

    {
        label: 'El. paštas',
        name: 'email',
        type: 'email',
        required: true,
        visibleIf: { field: 'age', condition: '>=', value: 18 }
    },

    {
        label: 'Motinystės atostogos?',
        name: 'onMaternityLeave',
        type: 'select',
        options: ['Taip', 'Ne'],
        visibleIf: { field: 'gender', condition: '==', value: 'Moteris' }
    },

    {
        label: 'Studento pažymėjimo numeris',
        name: 'studentId',
        type: 'text',
        visibleIf: { field: 'age', condition: '<', value: 26 }
    },

    {
        label: 'Nuolaidos kodas',
        name: 'discountCode',
        type: 'text',
        visibleIfAll: [
            { field: 'age', condition: '<', value: 26 },
            { field: 'studentId', condition: '!=', value: '' }
        ]
    }
];
