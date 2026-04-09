require('dotenv').config();
const mongoose = require('mongoose');
const Question = require('../models/Question');
const User = require('../models/User');

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected for seeding');
};

const questions = [
    // ==============================
    // COMPUTER SCIENCE (20 questions)
    // ==============================
    {
        subject: 'Computer Science', topic: 'Data Structures', difficulty: 'Medium', year: 2022,
        question: 'Which data structure is used in BFS traversal of a graph?',
        options: ['Stack', 'Queue', 'Priority Queue', 'Deque'],
        correctAnswer: 1,
        explanation: 'BFS uses a Queue (FIFO) to explore nodes level by level. DFS uses a Stack.',
    },
    {
        subject: 'Computer Science', topic: 'Algorithms', difficulty: 'Hard', year: 2021,
        question: 'What is the time complexity of Dijkstra\'s algorithm using a min-heap?',
        options: ['O(V²)', 'O(E log V)', 'O(V log E)', 'O(E + V)'],
        correctAnswer: 1,
        explanation: 'With a binary min-heap, each edge relaxation is O(log V) and there are E relaxations → O(E log V).',
    },
    {
        subject: 'Computer Science', topic: 'Operating Systems', difficulty: 'Medium', year: 2023,
        question: 'In Round Robin scheduling, increasing the time quantum causes the algorithm to behave like:',
        options: ['SJF', 'FCFS', 'SRTF', 'Priority Scheduling'],
        correctAnswer: 1,
        explanation: 'As the time quantum approaches infinity, each process runs to completion before context switch, mimicking FCFS.',
    },
    {
        subject: 'Computer Science', topic: 'Database Management', difficulty: 'Medium', year: 2022,
        question: 'Which normal form eliminates transitive dependencies?',
        options: ['1NF', '2NF', '3NF', 'BCNF'],
        correctAnswer: 2,
        explanation: '3NF (Third Normal Form) eliminates transitive dependencies where non-key attributes depend on other non-key attributes.',
    },
    {
        subject: 'Computer Science', topic: 'Computer Networks', difficulty: 'Easy', year: 2021,
        question: 'Which layer of the OSI model handles routing of packets?',
        options: ['Data Link Layer', 'Transport Layer', 'Network Layer', 'Session Layer'],
        correctAnswer: 2,
        explanation: 'The Network Layer (Layer 3) is responsible for logical addressing and routing of packets between networks.',
    },
    {
        subject: 'Computer Science', topic: 'Theory of Computation', difficulty: 'Hard', year: 2023,
        question: 'Which of the following languages is NOT context-free?',
        options: ['L = {a^n b^n | n≥0}', 'L = {ww | w∈{a,b}*}', 'L = {a^n b^m | n≤m}', 'L = palindromes over {a,b}'],
        correctAnswer: 1,
        explanation: 'L = {ww} requires remembering the entire first half to match the second half; it is context-sensitive, not context-free.',
    },
    {
        subject: 'Computer Science', topic: 'Compiler Design', difficulty: 'Medium', year: 2022,
        question: 'Which parsing technique uses a stack and input to construct a parse tree from leaf to root?',
        options: ['Top-Down Parsing', 'Bottom-Up Parsing', 'LL(1) Parsing', 'Recursive Descent Parsing'],
        correctAnswer: 1,
        explanation: 'Bottom-Up parsing builds the parse tree from leaves to root by reducing input to start symbol, typically using LR parsers.',
    },
    {
        subject: 'Computer Science', topic: 'Data Structures', difficulty: 'Easy', year: 2021,
        question: 'What is the worst-case time complexity of QuickSort?',
        options: ['O(n log n)', 'O(n²)', 'O(n)', 'O(log n)'],
        correctAnswer: 1,
        explanation: 'QuickSort degenerates to O(n²) when the pivot is always the smallest or largest element (sorted/reverse sorted input).',
    },
    {
        subject: 'Computer Science', topic: 'Operating Systems', difficulty: 'Hard', year: 2020,
        question: 'In the banker\'s algorithm, a state is safe if:',
        options: ['All processes are in waiting state', 'A safe sequence of processes exists', 'No deadlock has occurred yet', 'All resources are allocated'],
        correctAnswer: 1,
        explanation: 'A state is "safe" if there exists at least one ordering (safe sequence) in which every process can finish execution.',
    },
    {
        subject: 'Computer Science', topic: 'Computer Architecture', difficulty: 'Medium', year: 2022,
        question: 'In pipelining, the speedup is limited primarily by:',
        options: ['Data hazards only', 'Control hazards only', 'The slowest pipeline stage', 'The number of registers'],
        correctAnswer: 2,
        explanation: 'Pipeline speedup is bounded by the bottleneck stage — the stage with the highest execution time determines the clock cycle.',
    },
    {
        subject: 'Computer Science', topic: 'Algorithms', difficulty: 'Medium', year: 2023,
        question: 'Floyd-Warshall algorithm computes:',
        options: ['Single source shortest paths', 'All pairs shortest paths', 'Minimum spanning tree', 'Topological sort'],
        correctAnswer: 1,
        explanation: 'Floyd-Warshall computes shortest paths between all pairs of vertices in O(V³) using dynamic programming.',
    },
    {
        subject: 'Computer Science', topic: 'Database Management', difficulty: 'Hard', year: 2021,
        question: 'In SQL, which isolation level prevents dirty reads but allows non-repeatable reads?',
        options: ['Read Uncommitted', 'Read Committed', 'Repeatable Read', 'Serializable'],
        correctAnswer: 1,
        explanation: 'Read Committed prevents dirty reads (uncommitted data) but allows non-repeatable reads when another transaction commits changes.',
    },
    {
        subject: 'Computer Science', topic: 'Computer Networks', difficulty: 'Medium', year: 2020,
        question: 'TCP uses which mechanism to avoid congestion in a network?',
        options: ['Sliding Window only', 'Slow Start and Congestion Avoidance', 'Stop-and-Wait', 'Go-Back-N'],
        correctAnswer: 1,
        explanation: 'TCP congestion control uses Slow Start (exponential growth), Congestion Avoidance (linear growth), Fast Retransmit, and Fast Recovery.',
    },
    {
        subject: 'Computer Science', topic: 'Theory of Computation', difficulty: 'Medium', year: 2022,
        question: 'The halting problem is:',
        options: ['Decidable', 'Undecidable', 'Semi-decidable', 'NP-Complete'],
        correctAnswer: 1,
        explanation: 'The halting problem is undecidable — no algorithm can determine for all program-input pairs whether the program halts.',
    },
    {
        subject: 'Computer Science', topic: 'Data Structures', difficulty: 'Easy', year: 2023,
        question: 'A binary search tree with n nodes has a minimum height of:',
        options: ['n', 'log₂(n)', '⌊log₂(n)⌋', 'n/2'],
        correctAnswer: 2,
        explanation: 'A perfectly balanced BST has height ⌊log₂(n)⌋, which is the minimum possible height for n nodes.',
    },
    {
        subject: 'Computer Science', topic: 'Operating Systems', difficulty: 'Easy', year: 2021,
        question: 'Which page replacement algorithm suffers from Belady\'s anomaly?',
        options: ['LRU', 'FIFO', 'Optimal', 'LFU'],
        correctAnswer: 1,
        explanation: 'FIFO can suffer Belady\'s anomaly where increasing frames causes more page faults. LRU and Optimal are stack algorithms and are immune.',
    },
    {
        subject: 'Computer Science', topic: 'Algorithms', difficulty: 'Hard', year: 2020,
        question: 'Which problem class is NP-Hard but NOT NP-Complete?',
        options: ['SAT', 'Halting Problem', '3-SAT', 'Vertex Cover'],
        correctAnswer: 1,
        explanation: 'NP-Complete = NP-Hard ∩ NP. The Halting Problem is NP-Hard (harder than any NP problem) but not in NP, so it\'s NP-Hard but not NP-Complete.',
    },
    {
        subject: 'Computer Science', topic: 'Compiler Design', difficulty: 'Easy', year: 2022,
        question: 'Which phase of the compiler converts tokens into an Abstract Syntax Tree?',
        options: ['Lexical Analysis', 'Syntax Analysis', 'Semantic Analysis', 'Code Generation'],
        correctAnswer: 1,
        explanation: 'Syntax Analysis (parsing) takes token sequences from the lexer and constructs the Abstract Syntax Tree (AST).',
    },
    {
        subject: 'Computer Science', topic: 'Computer Architecture', difficulty: 'Easy', year: 2023,
        question: 'Cache memory is placed between CPU and main memory to:',
        options: ['Increase storage capacity', 'Reduce average memory access time', 'Provide virtual memory', 'Handle interrupts'],
        correctAnswer: 1,
        explanation: 'Cache exploits temporal and spatial locality to reduce average memory access time, bridging the speed gap between CPU and RAM.',
    },
    {
        subject: 'Computer Science', topic: 'Computer Networks', difficulty: 'Easy', year: 2020,
        question: 'DNS primarily maps:',
        options: ['IP to MAC addresses', 'Domain names to IP addresses', 'URLs to ports', 'IP to physical addresses'],
        correctAnswer: 1,
        explanation: 'DNS (Domain Name System) translates human-readable domain names (google.com) to machine-readable IP addresses.',
    },

    // ==============================
    // MATHEMATICS (18 questions)
    // ==============================
    {
        subject: 'Mathematics', topic: 'Linear Algebra', difficulty: 'Medium', year: 2022,
        question: 'The rank of a matrix A equals:',
        options: ['Number of rows', 'Number of non-zero rows in row echelon form', 'Number of columns', 'Determinant of A'],
        correctAnswer: 1,
        explanation: 'The rank of a matrix is the number of linearly independent rows (or columns), which equals the number of non-zero rows in its row echelon form.',
    },
    {
        subject: 'Mathematics', topic: 'Calculus', difficulty: 'Medium', year: 2021,
        question: 'The value of ∫₀^∞ e^(-x²) dx is:',
        options: ['1', '√π/2', 'π/2', '√π'],
        correctAnswer: 1,
        explanation: 'The Gaussian integral ∫₋∞^∞ e^(-x²) dx = √π, so ∫₀^∞ e^(-x²) dx = √π/2 by symmetry.',
    },
    {
        subject: 'Mathematics', topic: 'Probability', difficulty: 'Easy', year: 2023,
        question: 'If P(A) = 0.5 and P(B) = 0.4 and A, B are independent, then P(A∩B) = ?',
        options: ['0.9', '0.2', '0.1', '0.45'],
        correctAnswer: 1,
        explanation: 'For independent events, P(A∩B) = P(A) × P(B) = 0.5 × 0.4 = 0.2.',
    },
    {
        subject: 'Mathematics', topic: 'Differential Equations', difficulty: 'Hard', year: 2022,
        question: 'The general solution of dy/dx = y is:',
        options: ['y = x + C', 'y = Ce^x', 'y = Ce^(-x)', 'y = C sin(x)'],
        correctAnswer: 1,
        explanation: 'Separating variables: dy/y = dx → ln|y| = x + C₁ → y = Ce^x where C = e^(C₁).',
    },
    {
        subject: 'Mathematics', topic: 'Graph Theory', difficulty: 'Medium', year: 2021,
        question: 'A complete graph K_n has how many edges?',
        options: ['n', 'n(n-1)', 'n(n-1)/2', 'n²'],
        correctAnswer: 2,
        explanation: 'In K_n, every vertex connects to every other vertex. Total edges = C(n,2) = n(n-1)/2.',
    },
    {
        subject: 'Mathematics', topic: 'Linear Algebra', difficulty: 'Hard', year: 2020,
        question: 'Eigenvalues of a symmetric matrix are always:',
        options: ['Complex', 'Real', 'Purely imaginary', 'Zero'],
        correctAnswer: 1,
        explanation: 'By the Spectral Theorem, all eigenvalues of a real symmetric matrix are real numbers.',
    },
    {
        subject: 'Mathematics', topic: 'Calculus', difficulty: 'Easy', year: 2023,
        question: 'lim(x→0) (sin x)/x = ?',
        options: ['0', '1', '∞', 'undefined'],
        correctAnswer: 1,
        explanation: 'This is a fundamental limit: lim(x→0) sin(x)/x = 1. Proven by L\'Hôpital\'s rule or geometric argument.',
    },
    {
        subject: 'Mathematics', topic: 'Set Theory', difficulty: 'Easy', year: 2022,
        question: 'If |A| = m and |B| = n, the number of functions from A to B is:',
        options: ['m+n', 'mn', 'n^m', 'm^n'],
        correctAnswer: 2,
        explanation: 'Each of the m elements in A can be mapped to any of n elements in B independently, giving n^m total functions.',
    },
    {
        subject: 'Mathematics', topic: 'Probability', difficulty: 'Medium', year: 2021,
        question: 'The variance of a Poisson distribution with parameter λ is:',
        options: ['λ²', 'λ', '√λ', '1/λ'],
        correctAnswer: 1,
        explanation: 'For a Poisson distribution, both the mean and variance equal λ.',
    },
    {
        subject: 'Mathematics', topic: 'Graph Theory', difficulty: 'Hard', year: 2023,
        question: 'A graph is bipartite if and only if it contains no:',
        options: ['Hamiltonian cycle', 'Odd-length cycle', 'Even-length cycle', 'Spanning tree'],
        correctAnswer: 1,
        explanation: 'A graph is bipartite if and only if all its cycles have even length (equivalently, it has no odd-length cycles).',
    },
    {
        subject: 'Mathematics', topic: 'Linear Algebra', difficulty: 'Medium', year: 2022,
        question: 'The null space of matrix A contains the set of all x such that:',
        options: ['Ax = I', 'Ax = 0', 'xA = 0', 'det(A-xI) = 0'],
        correctAnswer: 1,
        explanation: 'The null space (kernel) of A is {x : Ax = 0}. Its dimension is the nullity of A.',
    },
    {
        subject: 'Mathematics', topic: 'Calculus', difficulty: 'Hard', year: 2020,
        question: 'If f(x) = x^n, then f\'(x) = ?',
        options: ['x^(n+1)', 'nx^(n-1)', '(n-1)x^n', 'nx^n'],
        correctAnswer: 1,
        explanation: 'By the power rule of differentiation: d/dx[x^n] = nx^(n-1).',
    },
    {
        subject: 'Mathematics', topic: 'Probability', difficulty: 'Hard', year: 2022,
        question: 'Bayes\' theorem relates P(A|B) to:',
        options: ['P(A) × P(B)', 'P(B|A) × P(A) / P(B)', 'P(A ∪ B)', 'P(B|A) / P(A)'],
        correctAnswer: 1,
        explanation: 'Bayes\' theorem: P(A|B) = P(B|A)P(A)/P(B). It allows updating probabilities based on new evidence.',
    },
    {
        subject: 'Mathematics', topic: 'Differential Equations', difficulty: 'Medium', year: 2021,
        question: 'Which method is used to solve non-homogeneous linear ODEs by finding a particular solution guess?',
        options: ['Separation of Variables', 'Method of Undetermined Coefficients', 'Euler\'s Method', 'Integrating Factor'],
        correctAnswer: 1,
        explanation: 'The Method of Undetermined Coefficients guesses the form of particular solution based on right-hand side function type.',
    },
    {
        subject: 'Mathematics', topic: 'Set Theory', difficulty: 'Medium', year: 2023,
        question: 'The power set of a set with n elements has:',
        options: ['n elements', 'n² elements', '2^n elements', 'n! elements'],
        correctAnswer: 2,
        explanation: 'The power set P(S) includes all subsets of S. For |S|=n, |P(S)| = 2^n, including the empty set and S itself.',
    },
    {
        subject: 'Mathematics', topic: 'Graph Theory', difficulty: 'Easy', year: 2020,
        question: 'A tree with n vertices has exactly:',
        options: ['n edges', 'n-1 edges', 'n+1 edges', 'n²-1 edges'],
        correctAnswer: 1,
        explanation: 'A tree is a connected acyclic graph. It always has exactly n-1 edges for n vertices.',
    },
    {
        subject: 'Mathematics', topic: 'Linear Algebra', difficulty: 'Easy', year: 2021,
        question: 'The determinant of an identity matrix I_n is:',
        options: ['n', '0', '1', 'n!'],
        correctAnswer: 2,
        explanation: 'The identity matrix has 1s on the diagonal. The determinant is the product of diagonal elements = 1.',
    },
    {
        subject: 'Mathematics', topic: 'Calculus', difficulty: 'Medium', year: 2022,
        question: 'The Taylor series expansion of e^x about x=0 is:',
        options: ['1 + x + x²/2! + x³/3! + ...', '1 + x + x² + x³ + ...', 'x + x²/2 + x³/3 + ...', '1 - x + x²/2! - x³/3! + ...'],
        correctAnswer: 0,
        explanation: 'The Maclaurin series for e^x = Σ(n=0 to ∞) x^n/n! = 1 + x + x²/2! + x³/3! + ...',
    },

    // ==============================
    // GENERAL APTITUDE (14 questions)
    // ==============================
    {
        subject: 'General Aptitude', topic: 'Verbal Reasoning', difficulty: 'Easy', year: 2023,
        question: 'Choose the word most opposite in meaning to "Verbose":',
        options: ['Talkative', 'Concise', 'Fluent', 'Eloquent'],
        correctAnswer: 1,
        explanation: '"Verbose" means using more words than necessary. Its antonym is "Concise" — expressing much in few words.',
    },
    {
        subject: 'General Aptitude', topic: 'Numerical Ability', difficulty: 'Easy', year: 2022,
        question: 'If 8 men complete a job in 12 days, how many days will 16 men take to complete the same job?',
        options: ['24 days', '6 days', '8 days', '10 days'],
        correctAnswer: 1,
        explanation: 'Men × Days = constant work. 8×12 = 16×D → D = 96/16 = 6 days.',
    },
    {
        subject: 'General Aptitude', topic: 'Logical Reasoning', difficulty: 'Medium', year: 2021,
        question: 'All roses are flowers. Some flowers wither quickly. Therefore:',
        options: ['All roses wither quickly', 'Some roses may wither quickly', 'No roses wither quickly', 'All flowers are roses'],
        correctAnswer: 1,
        explanation: 'We can only conclude that some roses "may" wither quickly since some flowers wither quickly and roses are flowers.',
    },
    {
        subject: 'General Aptitude', topic: 'Numerical Ability', difficulty: 'Medium', year: 2023,
        question: 'A train 150m long passes a pole in 15 seconds. Its speed in km/h is:',
        options: ['36 km/h', '40 km/h', '30 km/h', '45 km/h'],
        correctAnswer: 0,
        explanation: 'Speed = distance/time = 150/15 = 10 m/s = 10 × 18/5 = 36 km/h.',
    },
    {
        subject: 'General Aptitude', topic: 'Verbal Reasoning', difficulty: 'Easy', year: 2020,
        question: 'MANGO : FRUIT :: ROSE : ?',
        options: ['Garden', 'Flower', 'Petal', 'Plant'],
        correctAnswer: 1,
        explanation: 'Mango is a type of fruit; similarly, Rose is a type of Flower. This is a category relationship.',
    },
    {
        subject: 'General Aptitude', topic: 'Data Interpretation', difficulty: 'Medium', year: 2022,
        question: 'A student scores 70, 80, 90, and 60 in four subjects. What is the percentage score if total marks are 400?',
        options: ['70%', '75%', '65%', '80%'],
        correctAnswer: 1,
        explanation: 'Total = 70+80+90+60 = 300. Percentage = (300/400) × 100 = 75%.',
    },
    {
        subject: 'General Aptitude', topic: 'Logical Reasoning', difficulty: 'Hard', year: 2021,
        question: 'In a family, A is the brother of B. C is the father of A. D is the brother of C. How is D related to B?',
        options: ['Father', 'Uncle', 'Grandfather', 'Brother'],
        correctAnswer: 1,
        explanation: 'C is B\'s father. D is C\'s brother, so D is C\'s brother → D is B\'s uncle (paternal).',
    },
    {
        subject: 'General Aptitude', topic: 'Numerical Ability', difficulty: 'Easy', year: 2023,
        question: 'What is 15% of 240?',
        options: ['32', '36', '38', '40'],
        correctAnswer: 1,
        explanation: '15% of 240 = 0.15 × 240 = 36.',
    },
    {
        subject: 'General Aptitude', topic: 'Verbal Reasoning', difficulty: 'Medium', year: 2022,
        question: 'Select the pair that best expresses a relationship similar to: HUNGER : FOOD',
        options: ['Sleep : Dream', 'Thirst : Water', 'Anger : Patience', 'Cold : Rain'],
        correctAnswer: 1,
        explanation: 'Hunger is a need satisfied by food. Similarly, Thirst is a need satisfied by water. Same cause-solution relationship.',
    },
    {
        subject: 'General Aptitude', topic: 'Numerical Ability', difficulty: 'Hard', year: 2020,
        question: 'The compound interest on ₹10000 at 10% per annum for 2 years is:',
        options: ['₹2000', '₹2100', '₹1900', '₹2200'],
        correctAnswer: 1,
        explanation: 'CI = P(1+r)^n - P = 10000(1.1)² - 10000 = 12100 - 10000 = ₹2100.',
    },
    {
        subject: 'General Aptitude', topic: 'Logical Reasoning', difficulty: 'Easy', year: 2023,
        question: 'If APPLE = 50 and MANGO = 56, then GRAPE = ?',
        options: ['50', '52', '48', '54'],
        correctAnswer: 1,
        explanation: 'Each word\'s value = sum of letter positions + number of letters. G+R+A+P+E = 7+18+1+16+5 = 47, + 5 letters = 52.',
    },
    {
        subject: 'General Aptitude', topic: 'Data Interpretation', difficulty: 'Hard', year: 2021,
        question: 'If sales in 2020 were ₹5 lakhs and increased by 20% each year, what are sales in 2022?',
        options: ['₹6 lakhs', '₹7 lakhs', '₹7.2 lakhs', '₹8 lakhs'],
        correctAnswer: 2,
        explanation: '2021: 5 × 1.2 = ₹6 lakhs. 2022: 6 × 1.2 = ₹7.2 lakhs.',
    },
    {
        subject: 'General Aptitude', topic: 'Verbal Reasoning', difficulty: 'Hard', year: 2022,
        question: 'Identify the correctly punctuated sentence:',
        options: ['Its a dogs life', "It's a dog's life.", 'Its a dogs life.', "Its a dog's life."],
        correctAnswer: 1,
        explanation: '"It\'s" (contraction of "it is") and "dog\'s" (possessive) both require apostrophes.',
    },
    {
        subject: 'General Aptitude', topic: 'Numerical Ability', difficulty: 'Medium', year: 2020,
        question: 'Two pipes A and B can fill a tank in 12 and 16 hours respectively. If both are opened, how long to fill?',
        options: ['6.86 hours', '7 hours', '8 hours', '6 hours'],
        correctAnswer: 0,
        explanation: 'Combined rate = 1/12 + 1/16 = 4/48 + 3/48 = 7/48. Time = 48/7 ≈ 6.86 hours.',
    },

    // ==============================
    // ELECTRONICS (12 questions)
    // ==============================
    {
        subject: 'Electronics', topic: 'Digital Circuits', difficulty: 'Easy', year: 2023,
        question: 'The output of an XOR gate is HIGH when:',
        options: ['Both inputs are HIGH', 'Both inputs are LOW', 'Inputs are different', 'Any one input is HIGH'],
        correctAnswer: 2,
        explanation: 'XOR (Exclusive OR) produces output 1 only when the inputs differ (one is 0, the other is 1).',
    },
    {
        subject: 'Electronics', topic: 'Analog Circuits', difficulty: 'Medium', year: 2022,
        question: 'The voltage gain of an inverting op-amp amplifier is:',
        options: ['Rf/Ri', '-Rf/Ri', '1 + Rf/Ri', 'Ri/Rf'],
        correctAnswer: 1,
        explanation: 'For inverting op-amp: Av = -Rf/Ri. The negative sign indicates 180° phase inversion.',
    },
    {
        subject: 'Electronics', topic: 'Semiconductor Devices', difficulty: 'Easy', year: 2021,
        question: 'A p-n junction diode conducts in:',
        options: ['Reverse bias only', 'Forward bias only', 'Both biases', 'Zero bias'],
        correctAnswer: 1,
        explanation: 'A diode conducts current significantly only when forward-biased (p-side positive, n-side negative).',
    },
    {
        subject: 'Electronics', topic: 'Signals and Systems', difficulty: 'Hard', year: 2022,
        question: 'The Fourier transform of a rectangular pulse is a:',
        options: ['Rectangular pulse', 'Sinc function', 'Gaussian', 'Impulse'],
        correctAnswer: 1,
        explanation: 'The FT of a rectangular (rect) function in time domain is a sinc function in frequency domain and vice versa.',
    },
    {
        subject: 'Electronics', topic: 'Digital Circuits', difficulty: 'Medium', year: 2023,
        question: 'A D flip-flop is used primarily as:',
        options: ['An adder', 'A delay element / single-bit storage', 'A comparator', 'An oscillator'],
        correctAnswer: 1,
        explanation: 'D flip-flop stores 1 bit and outputs Q = D on the clock edge. Used in registers, shift registers, and data latching.',
    },
    {
        subject: 'Electronics', topic: 'Communication Systems', difficulty: 'Medium', year: 2020,
        question: 'In FM, the bandwidth is determined by:',
        options: ['Carrier frequency only', 'Message frequency only', 'Carson\'s rule (2(Δf + fm))', 'Sampling rate'],
        correctAnswer: 2,
        explanation: 'Carson\'s rule: BW_FM ≈ 2(Δf + fm) = 2fm(1+β), where β is modulation index and fm is message bandwidth.',
    },
    {
        subject: 'Electronics', topic: 'Analog Circuits', difficulty: 'Hard', year: 2021,
        question: 'The unity gain bandwidth of an op-amp is:',
        options: ['The DC gain', 'The frequency at which open-loop gain equals 1', 'The closed-loop bandwidth', 'The slew rate frequency'],
        correctAnswer: 1,
        explanation: 'UGBW (or GBP) is the frequency at which the open-loop gain of the op-amp falls to unity (0 dB).',
    },
    {
        subject: 'Electronics', topic: 'Semiconductor Devices', difficulty: 'Medium', year: 2023,
        question: 'In a BJT operating in saturation region:',
        options: ['Both junctions are forward biased', 'Both junctions are reverse biased', 'E-B forward, C-B reverse', 'E-B reverse, C-B forward'],
        correctAnswer: 0,
        explanation: 'In saturation, both the emitter-base junction and collector-base junction are forward biased.',
    },
    {
        subject: 'Electronics', topic: 'Signals and Systems', difficulty: 'Easy', year: 2022,
        question: 'Nyquist sampling theorem states that sampling frequency must be:',
        options: ['Equal to signal frequency', 'At least twice the maximum signal frequency', 'Half the signal frequency', 'Four times the signal frequency'],
        correctAnswer: 1,
        explanation: 'Nyquist theorem: fs ≥ 2fmax to avoid aliasing and perfectly reconstruct the signal.',
    },
    {
        subject: 'Electronics', topic: 'Digital Circuits', difficulty: 'Hard', year: 2020,
        question: 'The minimum number of 2-input NAND gates required to implement a 2-input AND gate is:',
        options: ['1', '2', '3', '4'],
        correctAnswer: 1,
        explanation: 'AND = NAND followed by NOT (another NAND with both inputs tied). Total: 2 NAND gates.',
    },
    {
        subject: 'Electronics', topic: 'Communication Systems', difficulty: 'Easy', year: 2023,
        question: 'In AM, if the modulation index m > 1, the result is:',
        options: ['Better SNR', 'Over-modulation (distortion)', 'Perfect transmission', 'Under-modulation'],
        correctAnswer: 1,
        explanation: 'Modulation index m > 1 causes over-modulation, leading to envelope distortion and clipping of the signal.',
    },
    {
        subject: 'Electronics', topic: 'Analog Circuits', difficulty: 'Easy', year: 2021,
        question: 'A common-emitter amplifier provides:',
        options: ['No voltage gain', 'Voltage gain with phase inversion', 'Voltage gain with no phase change', 'Current gain only'],
        correctAnswer: 1,
        explanation: 'CE amplifier provides both voltage gain and current gain, but introduces a 180° phase inversion between input and output.',
    },

    // ==============================
    // ELECTRICAL ENGINEERING (12 questions)
    // ==============================
    {
        subject: 'Electrical Engineering', topic: 'Circuit Analysis', difficulty: 'Easy', year: 2023,
        question: 'Kirchhoff\'s Voltage Law (KVL) states that:',
        options: ['Sum of currents at a node = 0', 'Sum of voltages in a closed loop = 0', 'Power = Voltage × Current', 'Resistance is constant'],
        correctAnswer: 1,
        explanation: 'KVL: The algebraic sum of all voltages (EMFs and drops) around any closed loop equals zero (energy conservation).',
    },
    {
        subject: 'Electrical Engineering', topic: 'AC Circuits', difficulty: 'Medium', year: 2022,
        question: 'The power factor of a purely resistive circuit is:',
        options: ['0', '0.5', '1', '√2'],
        correctAnswer: 2,
        explanation: 'In a purely resistive circuit, voltage and current are in phase (θ=0°). Power factor = cos(0°) = 1.',
    },
    {
        subject: 'Electrical Engineering', topic: 'Machines', difficulty: 'Medium', year: 2021,
        question: 'The speed of a DC motor is inversely proportional to:',
        options: ['Armature current', 'Field flux', 'Supply voltage', 'Armature resistance'],
        correctAnswer: 1,
        explanation: 'Motor speed N ∝ (V - IaRa) / φ. Speed is inversely proportional to field flux φ.',
    },
    {
        subject: 'Electrical Engineering', topic: 'Power Systems', difficulty: 'Hard', year: 2023,
        question: 'The per-unit system in power systems is used to:',
        options: ['Increase power efficiency', 'Simplify calculations across different voltage levels', 'Measure reactive power', 'Calculate line losses only'],
        correctAnswer: 1,
        explanation: 'The per-unit system normalizes quantities (voltage, current, impedance) to a chosen base, simplifying multi-voltage-level networks.',
    },
    {
        subject: 'Electrical Engineering', topic: 'Circuit Analysis', difficulty: 'Medium', year: 2022,
        question: 'Thevenin\'s theorem replaces a complex circuit with:',
        options: ['Current source + parallel resistance', 'Voltage source + series resistance', 'Two current sources', 'Ideal voltage source only'],
        correctAnswer: 1,
        explanation: 'Thevenin\'s theorem: Any linear circuit can be replaced by an equivalent voltage source (Vth) in series with a resistance (Rth).',
    },
    {
        subject: 'Electrical Engineering', topic: 'AC Circuits', difficulty: 'Hard', year: 2020,
        question: 'At resonance in a series RLC circuit:',
        options: ['Current is minimum', 'Impedance is maximum', 'XL = XC and impedance = R', 'Voltage across R is zero'],
        correctAnswer: 2,
        explanation: 'At resonance, XL = XC (inductive and capacitive reactances cancel). Impedance = R (minimum), current is maximum.',
    },
    {
        subject: 'Electrical Engineering', topic: 'Machines', difficulty: 'Easy', year: 2023,
        question: 'A transformer works on the principle of:',
        options: ['Electrostatic induction', 'Electromagnetic induction (mutual induction)', 'Self-induction', 'Hall effect'],
        correctAnswer: 1,
        explanation: 'Transformers operate on mutual electromagnetic induction — changing current in primary coil induces EMF in secondary coil.',
    },
    {
        subject: 'Electrical Engineering', topic: 'Power Systems', difficulty: 'Medium', year: 2021,
        question: 'What is the effect of power factor improvement?',
        options: ['Increases line losses', 'Reduces kVA rating required for same kW load', 'Increases reactive power', 'Has no effect on efficiency'],
        correctAnswer: 1,
        explanation: 'kVA = kW/PF. A higher power factor means less kVA is needed for the same real power, reducing equipment ratings and line losses.',
    },
    {
        subject: 'Electrical Engineering', topic: 'Circuit Analysis', difficulty: 'Easy', year: 2020,
        question: 'In a parallel circuit, the total resistance is:',
        options: ['Sum of all resistances', 'Always greater than smallest resistance', 'Always less than the smallest resistance', 'Product of resistances'],
        correctAnswer: 2,
        explanation: 'Parallel combination: 1/Rtotal = 1/R1 + 1/R2 + ... This makes Rtotal always less than the smallest individual resistance.',
    },
    {
        subject: 'Electrical Engineering', topic: 'AC Circuits', difficulty: 'Easy', year: 2022,
        question: 'Reactive power in an AC circuit is measured in:',
        options: ['Watts (W)', 'Volt-Amperes (VA)', 'Volt-Ampere Reactive (VAR)', 'Kilowatt-hours (kWh)'],
        correctAnswer: 2,
        explanation: 'Reactive power Q is measured in VAR (Volt-Ampere Reactive). It represents energy oscillating between source and reactive elements.',
    },
    {
        subject: 'Electrical Engineering', topic: 'Machines', difficulty: 'Hard', year: 2021,
        question: 'The synchronous speed of an induction motor with 4 poles at 50 Hz supply is:',
        options: ['1000 RPM', '1500 RPM', '3000 RPM', '750 RPM'],
        correctAnswer: 1,
        explanation: 'Ns = 120f/P = 120×50/4 = 1500 RPM. Actual speed is slightly less due to slip.',
    },
    {
        subject: 'Electrical Engineering', topic: 'Power Systems', difficulty: 'Easy', year: 2023,
        question: 'EHV transmission lines use high voltage to:',
        options: ['Increase current', 'Reduce transmission losses (I²R losses)', 'Increase impedance', 'Improve power factor'],
        correctAnswer: 1,
        explanation: 'P = VI → same power at higher V means lower I. Line losses = I²R, so lower current drastically reduces losses.',
    },

    // ==============================
    // MECHANICAL ENGINEERING (12 questions)
    // ==============================
    {
        subject: 'Mechanical Engineering', topic: 'Thermodynamics', difficulty: 'Easy', year: 2023,
        question: 'The first law of thermodynamics is a statement of:',
        options: ['Conservation of momentum', 'Conservation of energy', 'Entropy increase', 'Newton\'s law'],
        correctAnswer: 1,
        explanation: 'The first law: Energy cannot be created or destroyed, only transformed. ΔU = Q - W for closed systems.',
    },
    {
        subject: 'Mechanical Engineering', topic: 'Fluid Mechanics', difficulty: 'Medium', year: 2022,
        question: 'For an incompressible fluid, continuity equation gives:',
        options: ['ρA₁V₁ = ρA₂V₂', 'A₁V₁ = A₂V₂', 'P₁ + ½ρV₁² = P₂ + ½ρV₂²', 'ΔP = ρgΔh'],
        correctAnswer: 1,
        explanation: 'For incompressible flow (ρ = const), continuity reduces to A₁V₁ = A₂V₂ (conservation of volume flow rate).',
    },
    {
        subject: 'Mechanical Engineering', topic: 'Strength of Materials', difficulty: 'Medium', year: 2021,
        question: 'Poisson\'s ratio is defined as:',
        options: ['Longitudinal strain / Lateral strain', 'Lateral strain / Longitudinal strain', 'Stress / Strain', 'Shear stress / Shear strain'],
        correctAnswer: 1,
        explanation: 'Poisson\'s ratio ν = -εlateral/εlongitudinal. It describes how much a material contracts (or expands) laterally when stretched.',
    },
    {
        subject: 'Mechanical Engineering', topic: 'Engineering Mechanics', difficulty: 'Easy', year: 2023,
        question: 'The moment of a force about a point is the product of force and:',
        options: ['The displacement', 'The perpendicular distance from the point to force\'s line of action', 'The velocity', 'The acceleration'],
        correctAnswer: 1,
        explanation: 'Moment (torque) M = F × d, where d is the perpendicular distance (moment arm) from the pivot to the line of action of force.',
    },
    {
        subject: 'Mechanical Engineering', topic: 'Thermodynamics', difficulty: 'Hard', year: 2022,
        question: 'The Carnot efficiency of a heat engine operating between 600K and 300K is:',
        options: ['25%', '50%', '75%', '100%'],
        correctAnswer: 1,
        explanation: 'Carnot efficiency η = 1 - TL/TH = 1 - 300/600 = 1 - 0.5 = 50%.',
    },
    {
        subject: 'Mechanical Engineering', topic: 'Fluid Mechanics', difficulty: 'Hard', year: 2020,
        question: 'Reynolds number represents the ratio of:',
        options: ['Viscous forces to inertial forces', 'Inertial forces to viscous forces', 'Gravity to viscosity', 'Pressure to velocity'],
        correctAnswer: 1,
        explanation: 'Re = ρVD/μ = Inertial forces / Viscous forces. Re < 2300: laminar, Re > 4000: turbulent flow.',
    },
    {
        subject: 'Mechanical Engineering', topic: 'Strength of Materials', difficulty: 'Easy', year: 2023,
        question: 'Hooke\'s Law states that stress is proportional to strain within:',
        options: ['Plastic limit', 'Ultimate stress limit', 'Elastic limit', 'Breaking point'],
        correctAnswer: 2,
        explanation: 'Hooke\'s Law (σ = Eε) applies only within the elastic limit of the material where deformation is reversible.',
    },
    {
        subject: 'Mechanical Engineering', topic: 'Manufacturing', difficulty: 'Medium', year: 2022,
        question: 'In metal cutting, the tool life equation by Taylor is:',
        options: ['VT^n = C', 'V = CT^n', 'VT = C^n', 'T = CV^n'],
        correctAnswer: 0,
        explanation: 'Taylor\'s tool life equation: VT^n = C, where V = cutting speed, T = tool life, n = index depending on tool/material, C = constant.',
    },
    {
        subject: 'Mechanical Engineering', topic: 'Engineering Mechanics', difficulty: 'Medium', year: 2021,
        question: 'The centroid of a triangle is located at:',
        options: ['1/2 from base', '1/3 from base', '2/3 from base', '1/4 from base'],
        correctAnswer: 1,
        explanation: 'The centroid (center of mass) of a triangle is at h/3 from its base and 2h/3 from its apex, where h is the height.',
    },
    {
        subject: 'Mechanical Engineering', topic: 'Thermodynamics', difficulty: 'Medium', year: 2023,
        question: 'Otto cycle efficiency depends on:',
        options: ['Working fluid only', 'Compression ratio', 'Engine displacement', 'Fuel type only'],
        correctAnswer: 1,
        explanation: 'Otto cycle efficiency η = 1 - 1/r^(γ-1), where r = compression ratio and γ = ratio of specific heats (Cp/Cv).',
    },
    {
        subject: 'Mechanical Engineering', topic: 'Fluid Mechanics', difficulty: 'Easy', year: 2021,
        question: 'Bernoulli\'s equation applies to flow that is:',
        options: ['Compressible, viscous, and unsteady', 'Incompressible, inviscid (frictionless), and steady', 'Turbulent only', 'Viscous and steady'],
        correctAnswer: 1,
        explanation: 'Bernoulli\'s equation: P + ½ρV² + ρgh = constant, valid for incompressible, inviscid, steady flow along a streamline.',
    },
    {
        subject: 'Mechanical Engineering', topic: 'Manufacturing', difficulty: 'Easy', year: 2020,
        question: 'Which manufacturing process involves heating metal above melting point and pouring into molds?',
        options: ['Forging', 'Casting', 'Rolling', 'Welding'],
        correctAnswer: 1,
        explanation: 'Casting involves melting metal and pouring it into molds to achieve the desired shape upon solidification.',
    },

    // ==============================
    // CIVIL ENGINEERING (12 questions)
    // ==============================
    {
        subject: 'Civil Engineering', topic: 'Structural Analysis', difficulty: 'Medium', year: 2023,
        question: 'A simply supported beam with central point load deflects maximally at:',
        options: ['Quarter span from support', 'Mid-span', 'Three-quarter span', 'At support'],
        correctAnswer: 1,
        explanation: 'For a simply supported beam with a central load P, maximum deflection = PL³/48EI, occurring at mid-span.',
    },
    {
        subject: 'Civil Engineering', topic: 'Geotechnical Engineering', difficulty: 'Medium', year: 2022,
        question: 'Darcy\'s law for flow through porous media is:',
        options: ['v = k/i', 'v = ki', 'v = i/k', 'q = Ai²'],
        correctAnswer: 1,
        explanation: 'Darcy\'s law: v = ki, where v = seepage velocity, k = hydraulic conductivity, i = hydraulic gradient.',
    },
    {
        subject: 'Civil Engineering', topic: 'Concrete Technology', difficulty: 'Easy', year: 2021,
        question: 'The water-cement ratio in concrete primarily affects:',
        options: ['Color of concrete', 'Strength and durability', 'Setting time only', 'Aggregate size'],
        correctAnswer: 1,
        explanation: 'Lower w/c ratio → higher strength and durability. Higher w/c → more workability but weaker, more porous concrete.',
    },
    {
        subject: 'Civil Engineering', topic: 'Transportation Engineering', difficulty: 'Easy', year: 2023,
        question: 'The stopping sight distance on a highway depends on:',
        options: ['Vehicle width', 'Reaction time and braking distance', 'Lane width', 'Traffic volume'],
        correctAnswer: 1,
        explanation: 'SSD = reaction distance + braking distance = v×t + v²/(2μg), where v=speed, t=perception-reaction time, μ=friction coefficient.',
    },
    {
        subject: 'Civil Engineering', topic: 'Fluid Mechanics', difficulty: 'Medium', year: 2022,
        question: 'Manning\'s equation is used to calculate:',
        options: ['Flow in pressure pipes', 'Flow in open channels', 'Seepage through soil', 'Wave heights'],
        correctAnswer: 1,
        explanation: 'Manning\'s equation: V = (1/n)R^(2/3)S^(1/2), used for velocity in open channel flow, where n=roughness coefficient.',
    },
    {
        subject: 'Civil Engineering', topic: 'Structural Analysis', difficulty: 'Hard', year: 2020,
        question: 'The degree of static indeterminacy of a pin-jointed plane truss with j joints and m members is:',
        options: ['m + 3 - 2j', 'm - 2j + 3', 'm + j - 3', 'm - j'],
        correctAnswer: 0,
        explanation: 'Static indeterminacy = m + r - 2j, where r = reactions (3 for plane). Simplifies to m + 3 - 2j.',
    },
    {
        subject: 'Civil Engineering', topic: 'Concrete Technology', difficulty: 'Medium', year: 2023,
        question: 'Workability of fresh concrete is measured by:',
        options: ['Compressive strength test', 'Slump test', 'Tensile test', 'Sieve analysis'],
        correctAnswer: 1,
        explanation: 'The slump test measures workability (consistency) of fresh concrete. Higher slump = more workable mix.',
    },
    {
        subject: 'Civil Engineering', topic: 'Geotechnical Engineering', difficulty: 'Hard', year: 2021,
        question: 'The effective stress principle (Terzaghi) states:',
        options: ['Total stress equals pore pressure', 'Effective stress = total stress - pore water pressure', 'Pore pressure controls shear strength only', 'Effective stress is always zero'],
        correctAnswer: 1,
        explanation: 'σ\' = σ - u (Terzaghi). Effective stress σ\' governs soil behavior like shear strength and consolidation.',
    },
    {
        subject: 'Civil Engineering', topic: 'Transportation Engineering', difficulty: 'Medium', year: 2020,
        question: 'CBR (California Bearing Ratio) test is used to evaluate:',
        options: ['Concrete strength', 'Subgrade strength for pavement design', 'Aggregate quality', 'Bitumen properties'],
        correctAnswer: 1,
        explanation: 'CBR test measures subgrade soil strength for flexible pavement thickness design. Higher CBR → thinner pavement needed.',
    },
    {
        subject: 'Civil Engineering', topic: 'Structural Analysis', difficulty: 'Easy', year: 2023,
        question: 'A cantilever beam carries maximum bending moment at:',
        options: ['Free end', 'Mid-span', 'Fixed end (support)', 'Quarter span'],
        correctAnswer: 2,
        explanation: 'In a cantilever beam, the fixed end (wall support) carries maximum bending moment equal to the moment of all loads about that point.',
    },
    {
        subject: 'Civil Engineering', topic: 'Fluid Mechanics', difficulty: 'Easy', year: 2022,
        question: 'Specific gravity of water at 4°C is:',
        options: ['0', '0.5', '1.0', '1.5'],
        correctAnswer: 2,
        explanation: 'Specific gravity (relative density) of a substance is its density relative to water at 4°C. By definition, water\'s SG = 1.0.',
    },
    {
        subject: 'Civil Engineering', topic: 'Concrete Technology', difficulty: 'Hard', year: 2021,
        question: 'As per IS code, minimum grade of concrete for RCC structures exposed to mild conditions is:',
        options: ['M10', 'M15', 'M20', 'M25'],
        correctAnswer: 2,
        explanation: 'IS 456:2000 specifies M20 as minimum grade for RCC (reinforced) structures. M15 is used only for plain cement concrete.',
    },

    // ==============================
    // CHEMICAL ENGINEERING (12 questions)
    // ==============================
    {
        subject: 'Chemical Engineering', topic: 'Mass Transfer', difficulty: 'Medium', year: 2023,
        question: 'Fick\'s first law of diffusion relates molar flux to:',
        options: ['Pressure gradient', 'Concentration gradient', 'Temperature gradient', 'Velocity gradient'],
        correctAnswer: 1,
        explanation: 'Fick\'s first law: J = -D(dC/dz). Molar flux J is proportional to concentration gradient and diffusivity D.',
    },
    {
        subject: 'Chemical Engineering', topic: 'Heat Transfer', difficulty: 'Easy', year: 2022,
        question: 'The overall heat transfer coefficient U is related to individual resistances by:',
        options: ['U = h₁ + h₂', '1/U = 1/h₁ + 1/h₂ + Rwall', 'U = (h₁ × h₂)/(h₁+h₂)', 'U = 1/(h₁h₂)'],
        correctAnswer: 1,
        explanation: '1/U = 1/h₁ (inner film) + Rwall (conduction) + 1/h₂ (outer film). Resistances in series for heat transfer.',
    },
    {
        subject: 'Chemical Engineering', topic: 'Reaction Engineering', difficulty: 'Hard', year: 2021,
        question: 'For a first-order irreversible reaction in a CSTR at steady state:',
        options: ['XA = kτ/(1+kτ)', 'XA = 1 - e^(-kτ)', 'XA = kτ', 'XA = 1 - 1/(kτ)'],
        correctAnswer: 0,
        explanation: 'For 1st order CSTR: XA = kτ/(1+kτ), where τ = residence time = V/Q. Compare to PFR: XA = 1-e^(-kτ).',
    },
    {
        subject: 'Chemical Engineering', topic: 'Thermodynamics', difficulty: 'Medium', year: 2023,
        question: 'Gibbs free energy change for a spontaneous process at constant T and P must be:',
        options: ['Positive', 'Zero', 'Negative', 'Infinite'],
        correctAnswer: 2,
        explanation: 'For a spontaneous process at constant T and P: ΔG < 0. At equilibrium ΔG = 0. ΔG > 0: non-spontaneous.',
    },
    {
        subject: 'Chemical Engineering', topic: 'Fluid Mechanics', difficulty: 'Easy', year: 2022,
        question: 'Hagen-Poiseuille equation gives the pressure drop for:',
        options: ['Turbulent flow in pipes', 'Laminar flow in circular pipes', 'Flow over flat plates', 'Free convection'],
        correctAnswer: 1,
        explanation: 'Hagen-Poiseuille: ΔP = 128μLQ/(πD⁴), valid for laminar, incompressible, Newtonian flow in straight circular pipes.',
    },
    {
        subject: 'Chemical Engineering', topic: 'Mass Transfer', difficulty: 'Hard', year: 2020,
        question: 'The number of transfer units (NTU) in a distillation column relates to:',
        options: ['Column diameter', 'Separation difficulty (required driving force)', 'Feed composition only', 'Reflux ratio only'],
        correctAnswer: 1,
        explanation: 'NTU = ∫dy/(y*-y). A large NTU means the separation is difficult (small driving force y*-y), requiring more theoretical stages.',
    },
    {
        subject: 'Chemical Engineering', topic: 'Heat Transfer', difficulty: 'Medium', year: 2023,
        question: 'LMTD stands for:',
        options: ['Linear Mean Temperature Distribution', 'Logarithmic Mean Temperature Difference', 'Latent Mean Thermal Deviation', 'Lower Maximum Temperature Difference'],
        correctAnswer: 1,
        explanation: 'LMTD (Log Mean Temperature Difference) is used in heat exchanger design: Q = UA×LMTD.',
    },
    {
        subject: 'Chemical Engineering', topic: 'Reaction Engineering', difficulty: 'Medium', year: 2022,
        question: 'The Arrhenius equation k = Ae^(-Ea/RT) shows that reaction rate:',
        options: ['Decreases exponentially with temperature', 'Increases exponentially with temperature', 'Is independent of temperature', 'Is linear with temperature'],
        correctAnswer: 1,
        explanation: 'As T increases, -Ea/RT becomes less negative, so e^(-Ea/RT) increases. Rate constant k increases (roughly doubles per 10°C for many reactions).',
    },
    {
        subject: 'Chemical Engineering', topic: 'Thermodynamics', difficulty: 'Easy', year: 2021,
        question: 'Raoult\'s law is applicable to:',
        options: ['All liquid mixtures', 'Ideal liquid mixtures (similar molecules)', 'Gases only', 'Dilute solutions only'],
        correctAnswer: 1,
        explanation: 'Raoult\'s law (Pi = xi × Pisat) applies to ideal mixtures where intermolecular forces are similar between all components.',
    },
    {
        subject: 'Chemical Engineering', topic: 'Fluid Mechanics', difficulty: 'Medium', year: 2023,
        question: 'Bernoulli\'s equation accounts for:',
        options: ['Mass transfer only', 'Pressure, velocity, and elevation (energy per unit mass)', 'Heat transfer', 'Chemical reaction'],
        correctAnswer: 1,
        explanation: 'Bernoulli: P/ρg + V²/2g + z = constant. It balances pressure head, velocity head, and elevation head.',
    },
    {
        subject: 'Chemical Engineering', topic: 'Mass Transfer', difficulty: 'Easy', year: 2022,
        question: 'In absorption operations, the solvent used should have:',
        options: ['Low selectivity for solute', 'High selectivity and capacity for solute', 'High vapor pressure', 'Low boiling point'],
        correctAnswer: 1,
        explanation: 'An ideal absorption solvent: high selectivity (absorbs target only), high capacity, low volatility, non-corrosive, inexpensive.',
    },
    {
        subject: 'Chemical Engineering', topic: 'Reaction Engineering', difficulty: 'Easy', year: 2020,
        question: 'A CSTR is also known as:',
        options: ['Plug Flow Reactor', 'Batch Reactor', 'Mixed Flow Reactor / Back-Mix Reactor', 'Fluidized Bed Reactor'],
        correctAnswer: 2,
        explanation: 'CSTR (Continuous Stirred Tank Reactor) assumes perfect mixing → uniform concentration = exit concentration. Also called Mixed Flow Reactor or Back-Mix Reactor.',
    },
];

const seedQuestions = async () => {
    try {
        await connectDB();

        // Clear existing questions
        await Question.deleteMany({});
        console.log('🗑️  Cleared existing questions');

        // Insert all questions
        const inserted = await Question.insertMany(questions);
        console.log(`✅ Seeded ${inserted.length} questions across 8 subjects`);

        // Create admin user if not exists
        const adminExists = await User.findOne({ email: 'admin@gprep.com' });
        if (!adminExists) {
            await User.create({
                name: 'GPrep Admin',
                email: 'admin@gprep.com',
                password: 'Admin@123',
                role: 'admin',
            });
            console.log('👤 Admin user created: admin@gprep.com / Admin@123');
        } else {
            console.log('👤 Admin user already exists');
        }

        // Summary by subject
        const summary = {};
        inserted.forEach((q) => {
            summary[q.subject] = (summary[q.subject] || 0) + 1;
        });
        console.log('\n📊 Questions per subject:');
        Object.entries(summary).forEach(([subj, count]) => {
            console.log(`   ${subj}: ${count}`);
        });

        console.log('\n🎉 Seeding complete!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding error:', error);
        process.exit(1);
    }
};

seedQuestions();
