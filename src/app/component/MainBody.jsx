'use client'
import React, {useEffect, useRef, useState} from 'react';
import {getAnswers, getQuestions} from "../../../api/api";
import {useQuery} from "@tanstack/react-query";
import Image from "next/image";
import MinTheinKha from "../../../image/mintheinkhalogo.png";
const MainBody = () => {
    const randomNumbers = ["၃","၁၀","၅","၁၀","၇","၂","၅","၂","၇","၈","၆","၄","၅","၃","၁","၁၀","၈","၆","၇","၂","၉","၄","၉","၆","၉","၄","၁","၈","၅","၁၀","၆","၃","၈","၄","၁","၆","၃","၁","၉","၁","၉","၇","၉","၇","၅","၂","၇","၄","၁၀","၅","၂","၈","၃","၁၀","၇","၄","၉","၂","၉","၄","၉","၆","၁","၂","၁၀","၈","၇","၅","၃","၄","၂","၁၀","၁","၆","၃","၆","၁","၈","၃","၈","၅"]
    const {data : questions=[]} = useQuery({queryKey:['getQuestions'],queryFn:(getQuestions)})
    const [searchQuery, setSearchQuery] = useState("");
    const {data : answers=[]} = useQuery({queryKey:['getAnswers'],queryFn:(getAnswers)})
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [clickedAnswer, setClickedAnswer] = useState(false);
    const [selectedQuestion , setSelectedQuestion] = useState("")
    const [result , setResult] = useState("")
    const [answerForSelectedQuestion , setAnswerForSelectedQuestion] = useState([])
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const modalRef = useRef(null);
    const openModal = (questionNo) => {
        setIsModalOpen(true);
        filterAnswer(questionNo)
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleModalClick = (e) => {
        if (!modalRef.current.contains(e.target)) {
            closeModal();
        }
    };

    useEffect(() => {
        if (isModalOpen) {
            document.addEventListener('click', handleModalClick);
        }
        return () => {
            document.removeEventListener('click', handleModalClick);
        };
    }, [isModalOpen]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const getFilteredQuestions = () => {
        if (searchQuery) {
            // If there's a search query, filter questions
            return questions.filter((question) => {
                return question.questionName.includes(searchQuery);
            });
        } else {
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            return questions.slice(startIndex, endIndex);
        }
    };

    const filteredQuestions = getFilteredQuestions();

    const filterAnswer = (questionNo) => {
        const filterQuestion = questions.find(question => question.questionNo === questionNo)
        const filteredAnswer = answers.filter(answer => answer.questionNo === questionNo)
        setSelectedQuestion(filterQuestion.questionName)
        setAnswerForSelectedQuestion(filteredAnswer)
    };

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    shuffleArray(randomNumbers);

    function myanmarToEnglishNumber(myanmarNumber) {
        if (typeof myanmarNumber !== 'string') {
            myanmarNumber = myanmarNumber.toString();
        }
        const myanmarDigits = ['၁၀', '၁', '၂', '၃', '၄', '၅', '၆', '၇', '၈', '၉'];
        const englishDigits = ['10', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        for (let i = 0; i < myanmarDigits.length; i++) {
            myanmarNumber = myanmarNumber.replace(new RegExp(myanmarDigits[i], 'g'), englishDigits[i]);
        }
        return myanmarNumber;
    }

    const clickAnswer = (answerNo) =>{
        const englishNo = myanmarToEnglishNumber(answerNo)
        setResult(answerForSelectedQuestion[englishNo-1].answerResult)
        setClickedAnswer(true)
        closeModal()
    }

    return (
        <div className='mt-10 flex flex-col justify-center mx-40'>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                    <div className="bg-white w-1/2 p-6 rounded-lg shadow-lg" ref={modalRef}>
                        <p className='text-2xl text-amber-900 font-bold text-center'>လက်ထောက်ဗေဒင်</p>
                        <p className='font-bold text-center text-amber-700 mt-5'>{selectedQuestion}</p>
                        <div className='my-10 text-black flex justify-center'>
                            <div className='grid grid-cols-9'>
                            {randomNumbers.map((randomNumber,index) => (
                                <span key={index} className='bg-amber-900 text-white mr-1 w-10 mt-1 h-10 flex justify-center cursor-pointer items-center' onClick={() => clickAnswer(randomNumber)}>{randomNumber}</span>
                            ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {clickedAnswer && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                    <div className="bg-white w-1/2 p-6 rounded-lg shadow-lg" ref={modalRef}>
                        <div className='flex justify-center'>
                            <Image src={MinTheinKha} alt="MinTheinKhaLogo" className='w-24 h-24 rounded-full mr-5'></Image>
                        </div>
                        <p className='font-bold text-center text-amber-700 mt-3 text-2xl'>လက်ထောက်ဗေဒင်</p>
                        <p className='text-center font-bold mt-6'>{result}</p>
                        <div className='flex justify-center'>
                            <button className='mt-6 bg-amber-900 text-white py-2 px-2 rounded-xl' onClick={() => setClickedAnswer(false)}>ထပ်မေးမည်</button>
                        </div>
                    </div>
                </div>
            )}

            <input type="text" className="input input-bordered rounded-lg" placeholder='သိလိုသည်များကိုရှာဖွေပါ...'
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}>
            </input>

            <table className="bg-gray-100 table-auto border-2 border-collapse border-black w-full mt-5 text-amber-900 font-bold">
                <tbody>
                {filteredQuestions.map((question, index) => (
                    <tr key={index}>
                        <td className="border border-black p-2 text-center">{question.questionNo}</td>
                        <td
                            className="border border-black p-2 hover:cursor-pointer"
                            onClick={() => openModal(question.questionNo)}
                        >
                            {question.questionName}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/*Pagination*/}
            <nav aria-label="Page navigation example" className='mt-7 flex justify-center'>
                <ul className="inline-flex -space-x-px text-base h-10">
                    <button onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1} className="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</button>
                    <li>
                        <a onClick={() => setCurrentPage(1)} className="cursor-pointer flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                    </li>
                    <li>
                        <a onClick={() => setCurrentPage(2)} className="cursor-pointer flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                    </li>
                    <li>
                        <a onClick={() => setCurrentPage(3)} className="cursor-pointer flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">3</a>
                    </li>
                    <li>
                        <a onClick={() => setCurrentPage(4)} className="cursor-pointer flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                    </li>
                    <li>
                        <a onClick={() => setCurrentPage(5)} className="cursor-pointer flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
                    </li>
                    <button onClick={() => handlePageChange(currentPage + 1)}
                            disabled={endIndex >= questions.length} className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</button>
                </ul>
            </nav>
        </div>
    );
};

export default MainBody;