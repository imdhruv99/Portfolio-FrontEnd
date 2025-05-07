type EducationData = {
    id: number;
    institution: string;
    degree: string;
    period: string;
    grade: string;
};

const educationData: EducationData[] = [
    {
        id: 1,
        institution: 'Gujarat Technological University (GTU)',
        degree: "Bachelor's degree, Computer Engineering",
        period: 'Jun 2016 - Jun 2020',
        grade: '8.7/10',
    },
    {
        id: 2,
        institution: 'Shree Sahajanand Gurukul - Koteshwar',
        degree: "Higher Secondary Certificate - Science",
        period: 'Jun 2014 - Jun 2016',
        grade: '7.2/10',
    },
    {
        id: 5,
        institution: 'Shree Sahajanand Gurukul - Koteshwar',
        degree: "Secondary School Certificate",
        period: 'Jun 2013 - Jun 2014',
        grade: '8.1/10',
    },
];

export type { EducationData };
export default educationData;
