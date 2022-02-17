import axios from 'axios';


export const leadsApi =  (header,page) => {
    
    return new Promise( (resolve, reject) => {
        let url = `https://dev2.empgautos.com/api/crm/crm_leads?page=${page}`;
        
        axios.get(url, {
            headers: header,
        }).then((response) => {
                resolve(response);
            }
        ).catch((error => {
        
        }));
    });
}



