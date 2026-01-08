// data.js
export const profile = {
    name: "Jaeho Lee",
    role: "Research Assistant at Yonsei University",
    image: "http://corelab.or.kr/~jaeho/img/images/all/jaeho_port.png",
    contact: [
        { icon: "fas fa-university", text: "School of Electrical and Electronic Engineering" },
        { icon: "fas fa-flask", text: "Compiler Research Laboratory (Corelab)" },
        { icon: "fas fa-map-marker-alt", text: "Engineering Hall #3 C407, 50 Yonsei-Ro Seodaemun-gu, Seoul, 03722" },
        { icon: "fas fa-envelope", text: "[first_name]@yonsei.ac.kr", link: "mailto:jaeho@yonsei.ac.kr" },
    ]
};

export const navigation = [
    { id: "education", label: "Education" },
    { id: "experience", label: "Experience" },
    { id: "publications", label: "Publications" },
    { id: "activities", label: "Activities" },
    { id: "teaching", label: "Teaching" },
    { id: "misc", label: "Miscellaneous", icon: "fas fa-external-link-alt", link: "misc.html" }
];

export const sections = {
    education: [
        {
            title: "M.S./Ph.D. Student",
            meta: "March 2020 - Present",
            subtitle: "Yonsei University, Seoul, Republic of Korea",
            details: "Advisor: Prof. Hanjun Kim"
        },
        {
            title: "Bachelor of Engineering in Electrical and Electronic Engineering",
            meta: "March 2014 - February 2020",
            subtitle: "Yonsei University, Seoul, Republic of Korea"
        }
    ],
    experience: [
        {
            title: "Research Assistant",
            meta: "March 2020 - Present",
            subtitle: "Compiler Research Laboratory (Corelab), Yonsei University",
            location: "Seoul, Republic of Korea",
            detailsList: [
                "Memory optimization compiler for deep learning models on GPU systems",
                "Memory-aware GPU job scheduling for deep neural network models",
                "PyTorch 2.0 compiler optimization for deep learning models"
            ]
        },
        {
            title: "Undergraduate Research Assistant",
            meta: "January 2019 - February 2020",
            subtitle: "Compiler Research Laboratory (Corelab), Yonsei University",
            location: "Seoul, Republic of Korea",
            detailsList: [
                "Linux kernel module development for storage systems",
                "Ransomware detection and recovery SSD add-on device and device driver",
                "Reliable IoT device application development"
            ]
        }
    ],
    activities: [
        {
            title: "International Conference Organizing Assistant",
            meta: "October 2025",
            details: "Student Volunteer, Serving as registration center at the 58th IEEE/ACM International Symposium on Microarchitecture (MICRO)"
        }
    ],
    teaching: [
        {
            title: "Teaching Assistant",
            meta: "September 2023",
            subtitle: "ETRI (Electronics and Telecommunications Research Institute)",
            detailsHTML: "<strong>MLIR Compiler Framework</strong><br>Teaching the overall MLIR framework with optimizations with custom dialects"
        },
        {
            title: "Teaching Assistant",
            meta: "April 2022, December 2022",
            subtitle: "Samsung Electronics DS Division",
            detailsHTML: "<strong>IR Optimization with LLVM</strong><br>Teaching how to write LLVM passes for program analysis and optimization"
        },
        {
            title: "Teaching Assistant",
            meta: "Fall 2020 - Fall 2022",
            subtitle: "Yonsei University",
            detailsHTML: "<strong>EEE3313: Introductory Digital Labs</strong><br>Teaching lab classes about how to writing RTL Verilog code and designing hardware acceleration(FPGAARM)"
        },
        {
            title: "Teaching Assistant",
            meta: "Spring 2020",
            subtitle: "Yonsei University",
            detailsHTML: "<strong>EEE2020: Data Structure and Algorithm</strong><br>Teaching classes about how to use C++ language code"
        }
    ],
    misc: {
        tabs: [
            {
                id: "cfp",
                title: "Call for Papers",
                content: "<h3>Upcoming Deadlines</h3><ul id='cfp-list'><li>Loading deadlines...</li></ul>" 
            },
            {
                id: "gallery",
                title: "Gallery",
                content: "<p>Photo gallery coming soon...</p>"
            }
        ]
    }
};

export const publications = {
    journals: [
        {
            id: "jsa26_quilt",
            type: "journal",
            title: "Peak-Memory-aware Partitioning and Scheduling for Multi-tenant DNN Model Inference",
            authors: "<strong>Jaeho Lee</strong>, Ju Min Lee, Haeeun Jeong, Hyunho Kwon, Youngsok Kim, Yongjun Park, and Hanjun Kim",
            venue: "to appear in Journal of Systems Architecture, March 2026",
            note: "IF=4.1, Q1 (JCR 2025)",
            abstract: "As Deep Neural Networks (DNNs) are widely used in various applications, multiple DNN inference models start to run on a single GPU. The simultaneous execution of multiple DNN models can overwhelm the GPU memory with increasing model size, leading to unexpected out-of-memory (OOM) errors. To avoid OOM errors, existing systems schedule models at either the model-level or layer-level granularity. However, the model-level scheduling schemes inefficiently utilize memory spaces because they preallocate memory based on the model's peak memory demand, and the layer-level scheduling schemes suffer from high scheduling overhead due to fine-grained scheduling units. This work proposes a new peak-memory-aware DNN model partitioning compiler and scheduler, Quilt. The Quilt compiler partitions a DNN model into multiple tasks based on their peak memory usage, and the Quilt scheduler orchestrates the tasks of multiple models without the OOM errors. Additionally, the compiler generates a memory pool for tensors shared between partitioned tasks, reducing CPU-GPU communication overhead during consecutive task execution. Compared to the model-level and layer-level scheduling schemes, Quilt reduces overall latency by 25.4% and 37.7%, respectively, while preventing the OOM errors. Moreover, Quilt achieves up to 10.8% faster inference latency than the state-of-the-art Triton inference server for 6 DNN models.",
            links: []
        },
        {
            id: "ieeeiotj24_pset",
            type: "journal",
            title: "Privacy Set: Privacy Authority-Aware Compiler for Homomorphic Encryption on Edge-Cloud System",
            authors: "Dongkwan Kim, Yongwoo Lee, Seonyoung Cheon, Heelim Choi, <strong>Jaeho Lee</strong>, Hoyun Youm, Dongyoon Lee, and Hanjun Kim",
            venue: "IEEE Internet of Things Journal, August 2024",
            note: "IF=8.2, Q1 (JCR 2023)",
            abstract: "Fully homomorphic encryption (FHE) offers a promising solution for privacy-preserving cloud computing by allowing cloud servers to compute on encrypted data without decryption. However, its applicability is limited by the programming burden of ciphertext management and considerable operational latency. Recently proposed FHE compilers automate ciphermanagement, but they transform all data into ciphertexts without filtering private data, thus unnecessarily increasing FHE ciphertexts and the overall latency. This work introduces a new privacy authority type, called privacy-set (PSet), that allows programmers to annotate authorized devices for each unit of private data. Moreover, this work proposes a new privacy authority-aware compiler that automatically transforms a PSet-annotated plain program into an FHE-enabled edge-cloud cooperative program with operation authority-and latency-aware partitioning. This work evaluates the PSet compiler with six machine learning and deep learning applications, and demonstrates that the PSet compiler performs 4.92 times faster than the existing FHE compilers that do not support edge-cloud partitioning.",
            links: [{ name: "IEEE Xplore", url: "http://doi.org/10.1109/JIOT.2024.3437356" }]
        },
        {
            id: "ieeeiotj21_selectivecrypt",
            type: "journal",
            title: "Compiler-assisted Semantic-aware Encryption for Efficient and Secure Serverless Computing",
            authors: "Bongjun Kim, Seonyeong Heo, <strong>Jaeho Lee</strong>, Shinnung Jeong, Yongwoo Lee, and Hanjun Kim",
            venue: "IEEE Internet of Things Journal, April 2021",
            note: "IF=9.936, Q1 (JCR 2019)",
            abstract: "Serverless computing like Function-as-a-Service (FaaS) is attractive for IoT service providers, liberating the providers from server maintenance. Since a data processing function is executed on the cloud instead of a dedicated server in the FaaS platform, the service users send their private data in their IoT devices to the third-party cloud, taking privacy leakage risks. Homomorphic encryption can preserve the privacy by enabling encrypted data processing on the cloud, but using homomorphic encryption for every data item incurs large computation and communication overheads. This work proposes SelectiveCrypt, a compiler-assisted semantic-aware encryption scheme that applies different cryptographic primitives depending on the operations on each data item. SelectiveCrypt homomorphically encrypts data items if arithmetic operations are applied to the data, while SelectiveCrypt encrypts data items with a symmetric key if the data are stored in the cloud without any arithmetic operation. The SelectiveCrypt framework consists of a compiler and its runtime system. The SelectiveCrypt compiler statically analyzes the data processing, determines an appropriate cryptographic primitive for each data item, and automatically transforms arithmetic operations into the homomorphic computation. The SelectiveCrypt runtime encrypts and decrypts the data items according to the static analysis result. This work evaluates the prototype SelectiveCrypt framework with five benchmarks that reflect real-world IoT scenarios. The evaluation results show that the SelectiveCrypt framework successfully reduces response time and communication overhead by 1.59 times and 9.61 times respectively compared with a homomorphic encryption scheme.",
            links: [
                { name: "IEEE Xplore", url: "http://doi.org/10.1109/JIOT.2020.3031550" },
                { name: "SelectiveCrypt", url: "http://github.com/corelab-src/selectivecrypt", type: "github" }
            ]
        }
    ],
    conferences: [
        {
            id: "icpp24_temco",
            type: "conf",
            title: "TeMCO: Tensor Memory Compiler Optimization across Tensor Decompositions in Deep Learning Inference",
            authors: "Seungbin Song, Ju Min Lee, Haeeun Jeong, Hyunho Kwon, Shinnung Jeong, <strong>Jaeho Lee</strong>, and Hanjun Kim",
            venue: "Proceedings of the 53rd International Conference on Parallel Processing (ICPP), August 2024",
            abstract: "Since the increasing complexity of deep learning models, tensor decomposition is one of the promising solutions that reduce computational complexity in deep learning models. By decomposing a convolution layer with a large weight tensor into multiple layers with smaller weight tensors, tensor decomposition can reduce the number of operations and weight memory spaces. However, existing tensor decomposition schemes face difficulties in reducing peak memory usage of the entire inference. The decomposed layers produce the reduced-sized tensors during inference, but the reduced tensors should be restored to their original sizes due to skip connections and non-decomposed activation layers between the decomposed layers. To reduce the peak memory usage of the end-to-end inference of the decomposed models, this work proposes a new tensor memory optimization scheme and its prototype compiler, called TeMCO. TeMCO replaces the original internal tensors used in the skip connections with reduced internal tensors derived by the decomposed layers. In addition, TeMCO fuses the decomposed layers and the non-decomposed activation layer and thus keeps the reduced internal tensors produced without restoring them. Thanks to the optimizations, this work reduces memory usage of internal tensors by 75.7% for 10 models of 5 deep learning architectures.",
            links: [
                { name: "ACM", url: "http://dl.acm.org/doi/10.1145/3673038.3673048" },
                { name: "PDF", url: "http://corelab.or.kr/Pubs/icpp24_teMCO.pdf", type: "pdf" }
            ]
        },
        {
            id: "dac23_occamy",
            type: "conf",
            title: "Occamy: Memory-efficient GPU Compiler for DNN Inference",
            authors: "<strong>Jaeho Lee</strong>, Shinnung Jeong, Seungbin Song, Kunwoo Kim, Heelim Choi, Youngsok Kim, and Hanjun Kim",
            venue: "Proceedings of the 60th Annual Design Automation Conference 2023 (DAC), July 2023",
            abstract: "This work proposes Occamy, a new memory-efficient DNN compiler that reduces the memory usage of a DNN model without affecting its accuracy. For each DNN operation, Occamy analyzes the dimensions of input and output tensors, and their liveness within the operation. Across all the operations, Occamy analyzes liveness of all the tensors, generates a memory pool after calculating the maximum required memory size, and schedules when and where to place each tensor in the memory pool. Compared to PyTorch, on an integrated embedded GPU for six DNNs, Occamy reduces the memory usage by 34.6% and achieves a geometric mean speedup of 1.25x.",
            links: [
                { name: "IEEE Xplore", url: "http://doi.org/10.1109/DAC56929.2023.10247839" },
                { name: "Occamy", url: "http://github.com/corelab-src/occamy", type: "github" },
                { name: "PDF", url: "http://corelab.or.kr/Pubs/dac23_occamy.pdf", type: "pdf" }
            ]
        },
        {
            id: "pact22_graphDSE",
            type: "conf",
            title: "Decoupling Schedule, Topology Layout, and Algorithm to Easily Enlarge the Tuning Space of GPU Graph Processing",
            authors: "Shinnung Jeong, Yongwoo Lee, <strong>Jaeho Lee</strong>, Heelim Choi, Seungbin Song, Jinho Lee, Youngsok Kim, and Hanjun Kim",
            venue: "Proceedings of the 31st International Conference on Parallel Architectures and Compilation Techniques (PACT), October 2022",
            abstract: "Only with a right schedule and a right topology layout, a graph algorithm can be efficiently processed on GPUs. Existing GPU graph processing frameworks try to find an optimal schedule and topology layout for an algorithm via iterative search, but they fail to find the optimal configuration because their schedules and topology layouts are tightly coupled in their processing models. Moreover, their tightly coupled schedules and topology layouts make it difficult for developers to extend the tuning space. To easily enlarge the tuning space of GPU graph processing, this work proposes a new GPU graph processing abstraction scheme that fully decouples schedules, topology layouts, and algorithms from each other with abstraction interfaces. Moreover, this work proposes GRAssembler, a new GPU graph processing framework that efficiently integrates the decoupled schedule, topology layout, and algorithm without abstraction overhead. Thanks to the efficient decoupling and integration, GRAssembler increases the tuning space from 336 to 4,480 and achieves 30.4% higher performance on geomean average, compared to the state-of-the-art GPU graph processing framework.",
            links: [
                { name: "ACM", url: "http://doi.org/10.1145/3559009.3569686" },
                { name: "PDF", url: "http://corelab.or.kr/Pubs/pact22_graphDSE.pdf", type: "pdf" }
            ]
        }
    ],
    posters: [
        {
            id: "poster_dac25",
            type: "poster",
            title: "Approximation-based Inter-PE Communication-free Image Filtering for Commodity PIM",
            authors: "Chan Lee, Shinnung Jeong, Heelim Choi, <strong>Jaeho Lee</strong>, Haeeun Jeong, Hoyun Youm, Ju Min Lee, and Hanjun Kim",
            venue: "Proceedings of the 62th Annual Design Automation Conference 2025 - (Poster) (DAC), June 2025"
        },
        {
            id: "poster_cgo25",
            type: "poster",
            title: "Peak-Memory-aware Partitioning and Scheduling for Multi-tenant DNN Model Inference",
            authors: "<strong>Jaeho Lee</strong> and Hanjun Kim",
            venue: "Proceedings of the 23rd ACM International Symposium on Code Generation and Optimization Student Research Competition (SRC) (CGO), March 2025"
        },
        {
            id: "poster_usenix23",
            type: "poster",
            title: "Privacy Authority-Aware Compiler for Homomorphic Encryption on Edge-Cloud",
            authors: "Dongkwan Kim, Yongwoo Lee, Seonyoung Cheon, Heelim Choi, <strong>Jaeho Lee</strong>, Dongyoon Lee, and Hanjun Kim",
            venue: "32nd USENIX Security Symposium - (Poster) (USENIX Security), August 2023"
        }
    ],
    patents: [
        {
            type: "patent",
            title: "Compile Method and Apparatus for Neural Network",
            authors: "Hanjun Kim, Seungbin Song, Hyunho Kwon, Jumin Lee, Haeeun Jeong, and <strong>Jaeho Lee</strong>",
            venue: "KR Patent App. 10-2024-0088419, July 2024"
        },
        {
            type: "patent",
            title: "IoT Service Providing Method Based on Adaptive Encryption and IoT Apparatus",
            authors: "Hanjun Kim, Bongjun Kim, <strong>Jaeho Lee</strong>, Seonyeong Heo, Shinnung Jeong, and Yongwoo Lee",
            venue: "KR Patent Number"
        }
    ]
};
