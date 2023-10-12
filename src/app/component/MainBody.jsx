'use client'
import React, {useRef, useState} from 'react';
import {getAnswers, getQuestions} from "../../../api/api";
import {useQuery} from "@tanstack/react-query";
const MainBody = () => {
    const randomNumbers = ["၃","၁၀","၅","၁၀","၇","၂","၅","၂","၇","၈","၆","၄","၅","၃","၁","၁၀","၈","၆","၇","၂","၉","၄","၉","၆","၉","၄","၁","၈","၅","၁၀","၆","၃","၈","၄","၁","၆","၃","၁","၉","၁","၉","၇","၉","၇","၅","၂","၇","၄","၁၀","၅","၂","၈","၃","၁၀","၇","၄","၉","၂","၉","၄","၉","၆","၁","၂","၁၀","၈","၇","၅","၃","၄","၂","၁၀","၁","၆","၃","၆","၁","၈","၃","၈","၅"]
    const {data : questions=[]} = useQuery({queryKey:['getQuestions'],queryFn:(getQuestions)})
    const {data : answers=[]} = useQuery({queryKey:['getAnswers'],queryFn:(getAnswers)})
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedQuestion , setSelectedQuestion] = useState("")
    const [answerForSelectedQuestion , setAnswerForSelectedQuestion] = useState([])
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const visibleQuestions = questions.slice(startIndex, endIndex);
    const modalRef = useRef(null);
    const openModal = (questionNo) => {
        setIsModalOpen(true);
        filterAnswer(questionNo)
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleModalClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            closeModal();
        }
    };

    React.useEffect(() => {
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

    const filterAnswer = (questionNo) => {
        const filterQuestion = questions.find(question => question.questionNo === questionNo)
        const filteredAnswer = answers.filter(answer => answer.questionNo === questionNo);
        setSelectedQuestion(filterQuestion.questionName)
        setAnswerForSelectedQuestion(filteredAnswer)
    };

    return (
        <div className='mt-10 flex flex-col justify-center mx-40'>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                    <div className="bg-white w-1/2 p-6 rounded-lg shadow-lg" ref={modalRef}>
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={closeModal}
                        >
                            &times;
                        </button>
                        <p className='text-2xl text-amber-900 font-bold text-center'>လက်ထောက်ဗေဒင်</p>
                        <p className='font-bold text-center text-amber-700 mt-5'>{selectedQuestion}</p>
                        <div className='my-10 text-black flex justify-center'>
                            <div className='grid grid-cols-9'>
                            {randomNumbers.map(randomNumber => (
                                <span className='bg-amber-900 text-white mr-1 w-10 mt-1 h-10 flex justify-center items-center'>{randomNumber}</span>
                            ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <input type="text" className="input input-bordered rounded-lg" placeholder="သိလိုသည်များကိုရှာဖွေပါ..."/>
            <table className="bg-gray-100 table-auto border-2 border-collapse border-black w-full mt-5 text-amber-900 font-bold">
                <tbody>
                {visibleQuestions.map((question, index) => (
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

            {/* Pagination controls */}
            <div className="mt-3 flex justify-center">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className="mx-2">
          Page {currentPage} of {Math.ceil(questions.length / itemsPerPage)}
        </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={endIndex >= questions.length}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default MainBody;