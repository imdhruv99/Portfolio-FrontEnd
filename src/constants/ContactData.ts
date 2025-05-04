type ContactData = {
    id: number;
    platform: string;
    username?: string;
    url: string;
    icon?: string;
    color: string;
};

const contactData: ContactData[] = [
    {
        id: 1,
        platform: 'Email',
        url: 'mailto:yourname@example.com',
        icon: 'mail',
        color: '#EA4335',
    },
    {
        id: 2,
        platform: 'Contact Number',
        url: '+91 8200056075',
        icon: 'contact',
        color: '#6366F1',
    },
];

export type { ContactData };
export default contactData;
