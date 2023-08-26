figma.showUI(__html__, {width: 400, height: 500});

const LOGIN_TOKEN_KEY = 'LOGIN_TOKEN_KEY'
figma.ui.onmessage = async (msg) => {
  if (msg.type === 'store-user-info') {
    figma?.clientStorage.setAsync(LOGIN_TOKEN_KEY, msg.userInfo);
    figma.ui.postMessage({
      type: 'get-user-info',
      message: msg.userInfo,
    });
  }
  if (msg.type === 'load-user-info') {
    const userInfo = await figma?.clientStorage.getAsync(LOGIN_TOKEN_KEY);
    figma.ui.postMessage({
      type: 'get-user-info',
      message: userInfo,
    });
  }
  if (msg.type === 'logout') {
    await figma.clientStorage.deleteAsync(LOGIN_TOKEN_KEY);
    figma.ui.postMessage({
      type: 'logout',
      message: '',
    });
  }
  // figma.closePlugin();
};


