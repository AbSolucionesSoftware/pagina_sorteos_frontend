import Layout from "../Components/Layout/Layout";

import Home from "../Pages/FrontUsers/Home/Home";
import Login from "../Pages/FrontUsers/Login/Login";
import Verificador from "../Pages/FrontUsers/VerificadorBoletos/Verificador";
import SorteoTerminado from "../Pages/FrontUsers/SorteoTerminado";
import Boletos from "../Pages/FrontUsers/Boletos/Boletos";
import ComprarBoleto from "../Pages/FrontUsers/Boletos/ComprarBoleto";

import LayoutAdministrador from "../Components/Layout/LayoutAdmin";
import SorteoAdministrador from "../Pages/Admin/Sorteos/Sorteo";
import BannerAdmin from "../Pages/Admin/Publicidad/BannerAdmin";
import InoformacionEmpresa from "../Pages/Admin/Informacion/InoformacionEmpresa";
import PreguntasFrecuentes from "../Pages/Admin/PreguntasFrecuentes/PreguntasFrecuentes";
import VideosPromocionales from "../Pages/Admin/ListaVideos.js/VideosPromocionales";
import SorteosEliminados from '../Pages/Admin/Sorteos/SorteosEliminados/SorteosEliminados'

const routes = [
	{
		path: '/admin',
		component: LayoutAdministrador,
		exact: false,
		routes: [
			{
				path: '/admin',
				component: InoformacionEmpresa,
				exact: true,
			},
			{
				path: '/admin/sorteos-boletos',
				component: SorteoAdministrador,
				exact: true,
			},
			{
				path: '/admin/publicidad-banners',
				component: BannerAdmin,
				exact: true,
			},
			{
				path: '/admin/preguntas-frecuentes',
				component: PreguntasFrecuentes,
				exact: true,
			},
			{
				path: '/admin/videos-promocionales',
				component: VideosPromocionales,
				exact: true,
			},
			{
				path: '/admin/sorteos-eliminados',
				component: SorteosEliminados,
				exact: true,
			}
		]
	},
	{
		path: '/',
		component: Layout,
		exact: false,
		routes: [
			{
				path: '/',
				component: Home,
				exact: true,
			},
			{
				path: '/sorteos/verificador',
				component: Verificador,
				exact: true,
			},
			{
				path: '/sorteos/boletos',
				component: Boletos,
				exact: true,
			},
			{
				path: '/sorteos/sorteo-terminado',
				component: SorteoTerminado,
				exact: true,
			},
			{
				path: '/sorteos/login',
				component: Login,
				exact: true,
			},
			{
				path: '/sorteos/comprar-boleto/:numero/:idBoleto',
				component: ComprarBoleto,
				exact: true,
			}
		]
	}
];

export default routes;
