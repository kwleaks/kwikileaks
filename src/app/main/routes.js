import * as components from './components';
console.log(components)
export default [
	{
		path: '/',
		component: components.MainView
	},
	{
		path: '/addToilet',
		component: components.AddView
	},
	{
		path: '/filter',
		component: components.FilterView
	},
	{
		path: '/toilet/:id',
		component: components.ToiletView
	}
]