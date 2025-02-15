import './style.css'
import { Manager } from './manager.js'
import { LoaderScene } from './scenes/LoaderScene';

async function init() {
  await Manager.initialize(800, 600, 0x2e3037);
  const loader = new LoaderScene();
  Manager.changeScene(loader);
}
init();
