type ExperienceRole = {
    designation: string;
    period: string;
    description: string[];
    technologies: string[];
    client?: string;
};

type ExperienceData = {
    id: number;
    company: string;
    roles: ExperienceRole[];
    image: string;
    tenure: string;
};

export const getExperienceData = (isDarkTheme: boolean): ExperienceData[] => {
    return [
        {
            id: 1,
            company: 'Juniper Networks',
            tenure: 'Dec 2023 - Present',
            roles: [
                {
                    designation: 'Software Engineer 4',
                    period: 'Dec 2023 - Present',
                    description: [
                        'Designed and deployed two full-stack applications improving customer issue resolution time by 30%, enhancing product usability and support efficiency.',
                        'Upgraded Apache Kafka clusters from v2.1.1 to 3.7.2; led performance benchmarking and load testing to ensure stability.',
                        'Developed Kafka producers and consumers in Java, Go, and Python to support reliable real-time data pipelines.',
                        'Automated metric ingestion cleanup, saving $40,000/month in infrastructure costs.',
                        'Maintained Helm charts for 75+ microservices, accelerating deployments and streamlining CI/CD workflows.',
                    ],
                    technologies: [
                        'Docker',
                        'Go',
                        'Grafana',
                        'Helm',
                        'Java',
                        'Jenkins',
                        'Kafka',
                        'Kubernetes',
                        'Linux',
                        'Prometheus',
                        'Python',
                    ],
                }
            ],
            image: isDarkTheme ? '/images/jnpr_dark.png' : '/images/jnpr_light.png',
        },
        {
            id: 2,
            company: 'IBM',
            tenure: 'Aug 2023 - Dec 2023',
            roles: [
                {
                    designation: 'Senior Software Engineer',
                    period: 'Aug 2023 - Dec 2023',
                    description: [
                        'Upgraded production Kubernetes clusters and standardized dev environments, reducing deployment issues by 35%.',
                        'Created Ansible playbooks for MongoDB monitoring and alert automation, improving incident response time by 40%.',
                        'Remediated Docker image vulnerabilities using Trivy, reducing critical security risks by 90%.',
                        'Enhanced Jenkins CI/CD pipelines, cutting build and deployment time by 25%.',
                        'Implemented Prometheus monitoring and alerting, improving system observability and reliability.',
                    ],
                    technologies: [
                        'Ansible',
                        'Docker',
                        'Grafana',
                        'Jenkins',
                        'Kubernetes',
                        'Linux',
                        'MongoDB',
                        'Prometheus',
                        'Python',
                        'Trivy',
                    ],
                }
            ],
            image: '/images/ibm.png',
        },
        {
            id: 3,
            company: 'Crest Data Systems',
            tenure: 'Jun 2020 - Jul 2023',
            roles: [
                {
                    designation: 'Senior Software Engineer',
                    client: "Tesco",
                    period: 'Sep 2022 - Jul 2023',
                    description: [
                        'Built and scaled Azure infrastructure with Kubernetes and Terraform, achieving 99.9% uptime.',
                        'Automated SLO collection and dashboards using Docker and Python, reducing manual reporting by 80%.',
                        'Enhanced deployment reliability by integrating Ansible Lint and Jenkins, reducing config errors by 20%.',
                        'Collaborated cross-functionally to meet SLA targets, driving 95%+ on-time delivery for services.',
                        'Developed REST APIs and microservices supporting core business features with Flask and Python.',
                    ],
                    technologies: [
                        'Ansible',
                        'Azure',
                        'Docker',
                        'Flask',
                        'Jenkins',
                        'Kubernetes',
                        'Linux',
                        'Python',
                        'Terraform',
                    ],
                },
                {
                    designation: 'Software Engineer',
                    client: "LinkedIn",
                    period: 'Jun 2021 - Aug 2022',
                    description: [
                        'Implemented security-as-code for Azure cloud infrastructure using PowerShell, Python, and Terraform, improving compliance by 70%.',
                        'Developed Flask REST APIs and ReactJS UI to enhance cloud security operations visibility.',
                        'Optimized Azure Logic Apps workflows, reducing data collection time by 85%.',
                        'Improved incident response speed through automation of monitoring and alerting pipelines.',
                        'Worked closely with security and DevOps teams to implement scalable cloud solutions.',
                    ],
                    technologies: [
                        'Azure',
                        'Docker',
                        'Flask',
                        'Linux',
                        'PowerShell',
                        'Python',
                        'ReactJs',
                        'Terraform',
                    ],
                },
                {
                    designation: 'Software Engineer',
                    client: "Splunk",
                    period: 'Jun 2020 - Jun 2021',
                    description: [
                        'Automated CI/CD pipelines for Splunk apps in distributed environments, reducing deployment time by 60%.',
                        'Led a 20+ member team managing Splunk Cloud operations and incident response, achieving 99.9% uptime.',
                        'Integrated Jenkins, Docker, and Jira to streamline release workflows and cut manual overhead by 50%.',
                        'Improved issue resolution time by 45% through proactive monitoring and incident management.',
                        'Contributed to infrastructure-as-code automation using Terraform on AWS.',
                    ],
                    technologies: [
                        'Ansible',
                        'AWS',
                        'Docker',
                        'Jenkins',
                        'Kubernetes',
                        'Linux',
                        'Python',
                        'Splunk',
                        'Terraform',
                    ],
                }
            ],
            image: isDarkTheme ? '/images/cds_dark.png' : '/images/cds_light.png',
        },
        {
            id: 4,
            company: 'Softvan Pvt Ltd',
            tenure: 'Jun 2019 - Jun 2020',
            roles: [
                {
                    designation: 'Software Engineer-Intern',
                    period: 'Dec 2019 - Jun 2020',
                    description: [
                        'Built secure JWT/OAuth2 authentication systems using Flask and Python for scalable user management.',
                        'Developed sentiment analysis models using NLP, achieving 88% accuracy on news headlines.',
                        'Configured Jenkins CI/CD pipelines integrated with ELK and Prometheus for monitoring and deployment automation.',
                        'Containerized applications with Docker to improve environment consistency and deployment speed.',
                        'Collaborated with ML and DevOps teams to deploy and maintain machine learning services.',
                    ],
                    technologies: [
                        'Docker',
                        'ELK Stack',
                        'Flask',
                        'Jenkins',
                        'Linux',
                        'Machine Learning',
                        'OAuth2',
                        'Prometheus',
                        'Python',
                    ],
                },
                {
                    designation: 'Software Engineer-Trainee',
                    period: 'Jul 2019 - Dec 2019',
                    description: [
                        'Developed RESTful APIs in Python and Java to aggregate data from multiple databases, improving retrieval speed by 50%.',
                        'Provisioned AWS infrastructure using Terraform and deployed ELK stack to enhance system monitoring.',
                        'Designed and implemented employee retention prediction model using XGBoost with 85% accuracy.',
                        'Built full-stack solutions with Flask backend, React frontend, and real-time model inference APIs.',
                        'Collaborated with cross-functional teams to deliver ML-powered features for HR analytics.',
                    ],
                    technologies: [
                        'AWS',
                        'Flask',
                        'Java',
                        'Linux',
                        'Machine Learning',
                        'MySQL',
                        'Python',
                        'ReactJs',
                        'Terraform',
                        'XGBoost',
                    ],
                }
            ],
            image: '/images/softvan.png',
        },
    ];
};
