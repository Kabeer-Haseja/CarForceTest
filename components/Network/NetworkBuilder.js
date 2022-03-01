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

export function getLeadDetail(header,leadId) {
    return new Promise((resolve, reject) => {
        let url = `https://dev2.empgautos.com/api/crm/crm_leads/${leadId}`
        axios.get(url, {
            headers: header,
        }).then((response) => {
                resolve(response);
            }
        ).catch((error => {
        
        }));
    });
    
}
export  function  changeAssignee(header,assigneeId, leadId) {
   
    let bodyToSend = {
        crm_lead: {assignee_id: assigneeId},
    }
    return new Promise((resolve, reject) => {
        let url = `https://dev2.empgautos.com/api/crm/crm_leads/${leadId}/change_assignee`
       
        let config = {
            method:'put',
            url: url,
            data:bodyToSend,
            headers:header
        }
        
        axios(config).then((response) => {
                resolve(response);
            }
        ).catch((error => {
        
        }));

    })
}
export function getLeadTask(header, leadId) {
    return new Promise((resolve, reject) => {
        let url = `https://dev2.empgautos.com/api/crm/tasks?f[crm_lead.id]=${leadId}&limit=100`
        
        axios.get(url, {
            headers: header,
        }).then((response) => {
                resolve(response);
            }
        ).catch((error => {
    
        }));
        
    })
}
export function addCommentApi(header,comment, leadId) {
    
    return new Promise((resolve, reject) => {
        let url = `https://dev2.empgautos.com/api/crm/crm_leads/${leadId}/add_comment`
        let bodyToSend = {comment: comment}
        let config = {
            method:'put',
            url: url,
            data:bodyToSend,
            headers:header
        }
    
        axios(config).then((response) => {
                resolve(response);
            }
        ).catch((error => {
        }));
    
    })
}







