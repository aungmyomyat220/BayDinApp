'use client'
import React, {useState} from 'react';
import {getAnswers, getQuestions} from "../../../api/api";
import {useQuery} from "@tanstack/react-query";
const MainBody = () => {
    const {data : questions=[], error, isLoading} = useQuery({queryKey:['getQuestions'],queryFn:(getQuestions)})
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const visibleQuestions = questions.slice(startIndex, endIndex);
    getAnswers(questions)
        .then(data => {
            console.log("Answer => " + data);
        })
        .catch(error => {
            console.error("Error fetching data: ", error);
        });


    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className='mt-10 flex flex-col justify-center mx-40'>
            <input type="text" className="input input-bordered rounded-lg" placeholder="သိလိုသည်များကိုရှာဖွေပါ..."/>
            <table className="table-auto border-2 border-collapse border-black w-full mt-5 text-amber-900 font-bold">
                <tbody>
                {visibleQuestions.map((question, index) => (
                    <tr key={index}>
                        <td className="border border-black p-2 text-center">{question.questionNo}</td>
                        <td className="border border-black p-2 hover:cursor-pointer" onClick={() => getAnswers(question.questionNo)}>{question.questionName}</td>
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