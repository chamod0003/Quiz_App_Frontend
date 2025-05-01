import axios from "axios";

export const BASE_URL = 'https://localhost:7286/';

export const ENDPOINT ={

   
    RegisteredUsers : 'RegisteredUsers',

    Participants: 'Participants',
    Questions : 'Questions',
    GetAnswers : 'Questions/GetAnswers',
    ParticipantResult_c: 'ParticipantResult_c',
    Subjects : 'Subjects',

    Participant_c : 'Participant_c',
    Quiz_c : 'Quiz_c',
    GetAnswers_c: 'Quiz_c/GetAnswers_c',


    Quiz_java : 'Quiz_java',
    GetAnswers_java : 'Quiz_java/GetAnswers_java',

}
/*
export const createAPIEndpoint = endpoint => {
    let url = BASE_URL + 'api/' + endpoint + '/';
    return {
        fetch : () => axios.get(url),
        fetchById : id => axios.get(url + id),
        post : newRecord => axios.post(url, newRecord),
        put : (id, updatedRecord) => axios.put(url + id, updatedRecord),
        delete : id => axios.delete(url + id)
    }
}
*/


export const createAPIEndpoint = endpoint => {
    let url = BASE_URL + 'api/' + endpoint + '/';

    return {
        fetch: () => axios.get(url),
        fetchById: id => axios.get(url + id),
        post: newRecord => axios.post(endpoint === 'RegisteredUsers' ? url + 'register' : url, newRecord),
        put: (id, updatedRecord) => axios.put(url + id, updatedRecord),
        delete: id => axios.delete(url + id)
    };
};

