import './index.html';
import './index.less';
import dva from 'dva';

// 1. Initialize
const app = dva({
  initialState: window.pageOpt
});

// 2. Plugins
//app.use({});

// 3. Model
//app.model(require('./models/example'));
app.model(require('./models/sideMenu'));
app.model(require('./models/formSelects'));
app.model(require('./models/chartPage'));
app.model(require('./models/alert'));
app.model(require('./models/flowChart'));
app.model(require('./models/login'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
