import {useParams} from 'react-router-dom';
import { useEffect } from 'react';
import api from './services/api';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';