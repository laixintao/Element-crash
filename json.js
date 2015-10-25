/**
 * Created by laixintao on 15/10/25.
 */

var str = '[{"player":"1445750619728","speedX":"0","speedY":"0","shareSpeedX":"0","shareSpeedY":"0","ball":"false"},{"player":"1445779423134","speedX":"0","speedY":"0","shareSpeedX":"0","shareSpeedY":"0","ball":"false"}]'

var json = JSON.parse(str);
console.log(json[1]['player']);