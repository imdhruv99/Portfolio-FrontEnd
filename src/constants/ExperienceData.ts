type ExperienceData = {
    id: number;
    company: string;
    designation: string;
    period: string;
    description: string[];
    technologies: string[];
    color: string;
};

const experienceData: ExperienceData[] = [
    {
        id: 1,
        company: 'Juniper Networks',
        designation: 'DevOps Engineer 4',
        period: 'Dec 2023 - Present',
        description: [
            'Led the implementation of cloud-native DevOps solutions integrating Kubernetes, Prometheus, and Airflow.',
            'Contributed to ML model lifecycle automation and deployment using Docker, Airflow, and Python.',
            'Built observability pipelines using Grafana and Prometheus for real-time monitoring.',
            'Worked on infrastructure scalability and container orchestration using Kubernetes and Docker.',
            'Collaborated on experimentation frameworks for LLM-based services to evaluate inference performance.',
        ],
        technologies: [
            'Linux',
            'Prometheus',
            'Kubernetes',
            'Ansible',
            'Python',
            'Jenkins',
            'Grafana',
            'Docker',
            'Go',
            'Apache Airflow',
            'Apache Spark',
            'Apache Kafka',
            'Apache ZooKeeper',
            'Cassandra',
            'Machine Learning',
            'LLM',
        ],
        color: '#0F766E',
    },
    {
        id: 2,
        company: 'IBM',
        designation: 'Senior DevOps Engineer',
        period: 'Aug 2023 - Dec 2023',
        description: [
            'Upgraded production Kubernetes clusters and aligned dev environments for consistency.',
            'Created Ansible playbooks to monitor MongoDB pods and automate alerting.',
            'Resolved Docker vulnerabilities using SNYK, improving overall system security.',
            'Optimized CI/CD processes and system reliability through Jenkins enhancements.',
        ],
        technologies: [
            'Systems Design',
            'Prometheus',
            'Kubernetes',
            'Ansible',
            'Python',
            'Jenkins',
        ],
        color: '#3B82F6',
    },
    {
        id: 3,
        company: 'Crest Data Systems',
        designation: 'Senior DevOps Engineer - Tesco Splunk Automation',
        period: 'Sep 2022 - Jul 2023',
        description: [
            'Built scalable infrastructure using Azure, Kubernetes, and Terraform.',
            'Developed automation for SLO collection and visualization using Docker and Python.',
            'Improved deployment pipelines with Ansible lint and Jenkins integration.',
            'Collaborated with cross-functional teams in agile environment to meet SLA goals.',
        ],
        technologies: [
            'Azure',
            'Ansible',
            'Python',
            'Jenkins',
            'Kubernetes',
            'Docker',
            'Terraform',
            'Flask',
            'API',
        ],
        color: '#8B5CF6',
    },
    {
        id: 4,
        company: 'Crest Data Systems',
        designation: 'DevSecOps Engineer - LinkedIn Cloud Security',
        period: 'Jun 2021 - Aug 2022',
        description: [
            'Managed security-as-code for cloud infrastructure using Azure, PowerShell, and Python.',
            'Built APIs and UI enhancements for cloud security operations dashboards.',
            'Optimized Azure Logic Apps, reducing data collection time by 85%.',
        ],
        technologies: [
            'Azure',
            'Python',
            'ReactJS',
            'PowerShell',
            'Flask',
            'Docker',
            'Terraform',
            'API',
        ],
        color: '#EC4899',
    },
    {
        id: 5,
        company: 'Crest Data Systems',
        designation: 'Site Reliability Engineer - Splunk',
        period: 'Jun 2020 - Jun 2021',
        description: [
            'Automated CI/CD pipelines for Splunk apps across distributed architectures.',
            'Managed 20+ person team for Splunk Cloud operations and incident response.',
            'Integrated Jenkins, Docker, and Jira for release management workflows.',
        ],
        technologies: [
            'Python',
            'Jenkins',
            'Docker',
            'AWS',
            'Puppet',
            'Splunk',
            'Terraform',
        ],
        color: '#F59E0B',
    },
    {
        id: 6,
        company: 'Softvan Pvt Ltd',
        designation: 'Software Engineer-Intern',
        period: 'Dec 2019 - Jun 2020',
        description: [
            'Developed JWT/OAuth2 authentication systems using Flask and Python.',
            'Built sentiment analysis models with NLP techniques for news headlines.',
            'Deployed Jenkins CI/CD pipelines with monitoring using ELK and Prometheus.',
        ],
        technologies: [
            'Flask',
            'Python',
            'OAuth2',
            'Machine Learning',
            'Docker',
            'Grafana',
            'Prometheus',
            'AWS',
        ],
        color: '#6366F1',
    },
    {
        id: 7,
        company: 'Softvan Pvt Ltd',
        designation: 'Software Engineer-Trainee',
        period: 'Jul 2019 - Dec 2019',
        description: [
            'Created RESTful APIs for multi-database data collection in Python and Java.',
            'Provisioned AWS infrastructure using Terraform and deployed ELK stack.',
            'Designed and implemented an end-to-end employee retention prediction system using XGBoost.',
            'Built the full-stack solution with Flask (backend), React (frontend), and integrated model inference APIs for real-time predictions.',
        ],
        technologies: [
            'REST APIs',
            'Flask',
            'Python',
            'Java',
            'AWS',
            'Terraform',
            'MySQL',
            'React',
            'XGBoost',
            'Machine Learning',
            'Pandas',
            'Scikit-learn',
        ],
        color: '#10B981',
    },
];

export type { ExperienceData };
export default experienceData;
