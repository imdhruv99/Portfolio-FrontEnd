type CertificateData = {
    id: number;
    title: string;
    issuer: string;
    issueDate: string;
    credentialId?: string;
    credentialUrl?: string;
    skills: string[];
    image?: string;
};

const sortedCertificateData: CertificateData[] = [
    {
        id: 1,
        title: 'Certified Kubernetes Security Specialist',
        issuer: 'The Linux Foundation',
        issueDate: 'Jun 2024',
        credentialId: 'LF-perx0w14k6',
        credentialUrl:
            'https://www.credly.com/earner/earned/badge/1302d89e-c584-40d6-ad91-5d3e4a881d11',
        skills: ['Kubernetes', 'Security'],
        image: '/images/cks.png'
    },
    {
        id: 2,
        title: 'Certified Kubernetes Administrator',
        issuer: 'The Linux Foundation',
        issueDate: 'Feb 2024',
        credentialId: 'LF-iphu8udve2',
        credentialUrl:
            'https://www.credly.com/earner/earned/badge/a684b7ee-4ee5-4d02-8bd5-fc5280ceeea8',
        skills: ['Kubernetes'],
        image: '/images/cka.png'
    },
    {
        id: 3,
        title: 'Linux Foundation Certified System Administrator (LFCS)',
        issuer: 'KodeKloud',
        issueDate: 'Apr 2023',
        credentialId: '2D0AF9104276-2D16C13CE9E5-2D0AED7FE7A8',
        credentialUrl: 'https://learn.kodekloud.com/certificate/2D0AF9104276-2D16C13CE9E5-2D0AED7FE7A8',
        skills: ['System Administration', 'Linux'],
        image: '/images/csa.png'
    },
    {
        id: 4,
        title: 'Applied Data Science with Python - Level 2',
        issuer: 'IBM',
        issueDate: 'Jan 2021',
        credentialUrl:
            'https://www.credly.com/earner/earned/badge/42395e8d-97e8-413c-8c1e-0f173af35a4f',
        skills: ['Python', 'Machine Learning'],
        image: '/images/adsp.png'
    },
    {
        id: 5,
        title: 'Data Analysis Using Python',
        issuer: 'IBM',
        issueDate: 'Jan 2021',
        credentialUrl:
            'https://www.credly.com/earner/earned/badge/3854b0e2-420a-48a9-a1e9-b3d7e249d37a',
        skills: ['Python', 'EDA'],
        image: '/images/dap.png'
    },
    {
        id: 6,
        title: 'Data Visualization Using Python',
        issuer: 'IBM',
        issueDate: 'Jan 2021',
        credentialUrl:
            'https://www.credly.com/earner/earned/badge/fd637fac-0dc8-47a2-be5f-6d52e97e0630',
        skills: ['Python', 'Matplotlib', 'Seaboarn'],
        image: '/images/dvp.png'
    },
    {
        id: 7,
        title: 'Machine Learning with Python - Level 1',
        issuer: 'IBM',
        issueDate: 'Jan 2021',
        credentialUrl:
            'https://www.credly.com/earner/earned/badge/183db7e3-c39f-4492-9d9a-ee6357fa5fd8',
        skills: [
            'Machine Learning',
            'Python'
        ],
        image: '/images/mlp.png'
    },
    {
        id: 8,
        title: 'Python for Data Science',
        issuer: 'IBM',
        issueDate: 'Jan 2021',
        credentialUrl:
            'https://www.credly.com/earner/earned/badge/436fe513-437b-48dc-a416-ae366e8ba0f4',
        skills: ['Python'],
        image: '/images/pds.png'
    },
    {
        id: 9,
        title: 'Machine Learning by Stanford University',
        issuer: 'Coursera',
        issueDate: 'Aug 2021',
        credentialId: '34dd40805163575090878aae3887db56',
        credentialUrl: 'https://coursera.org/share/34dd40805163575090878aae3887db56',
        skills: [
            'Machine Learning',
            'Deep Learning',
            'Artificial Intelligence (AI)',
        ],
        image: '/images/su.png'
    },
    {
        id: 10,
        title: 'Problem Solving',
        issuer: 'HackerRank',
        issueDate: 'Nov 2022',
        credentialUrl: 'https://www.hackerrank.com/certificates/bc82139c5c59',
        skills: ['Critical Thinking', 'Problem Solving'],
        image: '/images/hr.png'
    },
    {
        id: 11,
        title: 'Python Basic',
        issuer: 'HackerRank',
        credentialId: '009e79ac16e1',
        credentialUrl: 'https://www.hackerrank.com/certificates/009e79ac16e1',
        skills: ['Python'],
        issueDate: 'July 2021',
        image: '/images/hr.png'
    },
    {
        id: 12,
        title: 'Machine Learning & Deep Learning with Python & R',
        issuer: 'Udemy',
        issueDate: 'Feb 2021',
        credentialId: 'UC-14c017d6-a101-49ac-bd35-a8331366c5f4',
        credentialUrl: 'https://www.udemy.com/certificate/UC-14c017d6-a101-49ac-bd35-a8331366c5f4/',
        skills: [
            'Machine Learning',
            'Deep Learning',
            'Artificial Intelligence (AI)',
        ],
        image: '/images/udemy.png'
    },
    {
        id: 13,
        title: 'Google AI ML Explore',
        issuer: 'Google',
        issueDate: 'Jun 2021',
        credentialUrl: 'https://drive.google.com/file/d/1Pk74LZJif8hNPTRXHxQ1B5S6fBrsJG1R/view',
        skills: [
            'Machine Learning',
            'Deep Learning',
            'Artificial Intelligence (AI)',
        ],
        image: '/images/google.png'
    },
];

export type { CertificateData };
export default sortedCertificateData;
