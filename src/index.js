import dva from 'dva'
import { browserHistory } from 'dva/router'

import device from 'current-device'

// 1. Initialize
const app = dva({
	history: browserHistory
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/court').default);

// 4. Router---区分设备进行挂载
if (device.mobile()) {
	app.router(require('./router/mobileIndex').default);
} else {
	app.router(require('./router/index').default);
}

// 5. Start
app.start('#root');
