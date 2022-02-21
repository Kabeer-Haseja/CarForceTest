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

export const leadAssignee=(header)=>{
    return new Promise( (resolve, reject) => {
        let url = `https://dev2.empgautos.com/api/users`;
        axios.get(url, {
            headers: header,
        }).then((response) => {
                resolve(response);
            }
        ).catch((error => {
        
        }));
    });
}
export const getLeadSources=(header)=>{
    return new Promise( (resolve, reject) => {
        let url = `https://dev2.empgautos.com/api/lead_sources`;
            axios.get(url, {
                headers: header,
            }).then((response) => {
                    resolve(response);
                }
            ).catch((error => {
            
            }));
    });
}
export const getLeadCategoryTypes=(header)=>{
    return new Promise( (resolve, reject) => {
        let url = `https://dev2.empgautos.com/api/crm/category_types`;
        axios.get(url, {
            headers: header,
        }).then((response) => {
                resolve(response);
            }
        ).catch((error => {
        
        }));
    });
}


export const applyFilters=(header,values,page)=>{
    return new Promise( (resolve, reject) => {
        let url = `https://dev2.empgautos.com/api/crm/crm_leads?page=${page}`+values;
        axios.get(url, {
            headers: header,
        }).then((response) => {
                resolve(response);
            }
        ).catch((error => {
        
        }));
    });
}
export const getLeadsChipStatus =  (header) => {
    
    return new Promise( (resolve, reject) => {
        let url = `https://dev2.empgautos.com/api/crm/crm_leads?`;
        
        axios.get(url, {
            headers: header,
        }).then((response) => {
                resolve(response);
            }
        ).catch((error => {
        
        }));
    });
}





