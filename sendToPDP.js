// window.jsonData = JSON.stringify(allFieldsData);
// window.hashValue = simpleHash(jsonData);
function sendToPDP(){
    var iframe = window.parent.document.getElementById('WebResource_new_2');
    if(iframe){
        var iframeWindow = iframe.contentWindow;
        if(iframeWindow.jsonData){
            console.log(iframeWindow.jsonData,"修改了garding数据")
            //add to  compare the data change and update the audit history
            // 转换函数
function transformData(data) {
    const transformed = {
        "grading-date": data.gradingDate,
        "grade": data.grade,
        "final-decision": data.finalDecision,
        "content-type": data.contentType,
        "comment": data.comment
    };
    data.switches.forEach((value, index) => {
        transformed[`switch${index + 1}`] = value;
    });
    return transformed;
}

// 比较函数
function compareData(original, target) {
    const changes = [];
    for (const key in target) {
        if (target[key] !== original[key]) {
            changes.push({
                field: key.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()).replace(' ', ''),
                old: { value: original[key] },
                new: { value: target[key] }
            });
        }
    }
    return changes;
}
//日期函数
function getCurrentFormattedTime() {
    var now = new Date();
    var year = now.getFullYear();
    var month = ('0' + (now.getMonth() + 1)).slice(-2); // 月份从0开始，需要加1
    var day = ('0' + now.getDate()).slice(-2);
    var hours = ('0' + now.getHours()).slice(-2);
    var minutes = ('0' + now.getMinutes()).slice(-2);
    var seconds = ('0' + now.getSeconds()).slice(-2);

    return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
}

// 生成变化结果
const transformedData = transformData(iframeWindow.originalData);
const changes = compareData(transformedData,JSON.parse( iframeWindow.jsonData));
const compressedChanges = JSON.stringify(changes);
console.log(changes,"changes");
const change=[];
const now=getCurrentFormattedTime();
change.push({date:now,changes:compressedChanges});
const resultnew= {
    ava_changedate: now,
    ava_changes: JSON.stringify(change),
    ava_dataid:iframeWindow.DataId,
    ava_tablelogicname:"ava_brand"
};
Xrm = window.parent.Xrm;
Xrm.WebApi.createRecord("ava_table1", resultnew).then(
    function success(result) {
        console.log("Account created with ID: " + result.id);
        // perform operations on record creation
    },
    function (error) {
        console.log(error.message);
        // handle error conditions
    }
);

         //todo need add api to send data to pdp,and add a filed to save the brand grading data
         var alertStrings = { confirmButtonLabel: "Yes", text: "Your brand grading update has been synced to PDP. In this case, the sync to CMS will be done from PDP. The \"Send to CMS\" button is not needed in this case and will not sync the changed data to CMS. \n However, keep in mind that in case you made other changes than related to brand grading or cross market, then those changes likely still need to be synced to CMS.  \nWhen in doubt, then go ahead and click on \“Send to CMS\”. There is no harm, even for data that is only synced to PDP.", title: "Note" };
         // var alertOptions = { height: 600, width: 300 };
         Xrm.Navigation.openAlertDialog(alertStrings).then(
             function (success) {
                 console.log("Alert dialog closed");
             },
             function (error) {
                 console.log(error.message);
             }
         );
        }
           
    }

  

}
//
function simpleHash(str) {
    let hash = 0;
    if (str.length === 0) return hash;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash &= hash; // 转换为32位整数
    }
    return hash.toString();
}
