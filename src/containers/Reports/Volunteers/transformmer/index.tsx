import _ from 'lodash';
export const transformReportData = (volunteers: any[]) => {
    let ministryOrPosition = _.uniqBy(volunteers, 'ministryOrPosition').map(v => v.ministryOrPosition);
    let response = [_.concat('Cidade', ministryOrPosition)];
    _(volunteers).groupBy(v => v.city).forEach((c, key) => {
        let data: any = [key];
        ministryOrPosition.forEach(m => {
            data.push(_.countBy(c, v => v.ministryOrPosition === m).true || 0);
        })
        response.push(data);
    });

    return response;
}