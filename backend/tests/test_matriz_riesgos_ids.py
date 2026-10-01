"""Regresión del contrato HTTP de IDs, con SQLite aislado en memoria.

Ejecutar desde backend: python -m unittest discover -s tests
Instalar requirements-dev.txt antes de ejecutar.
"""
import os
import unittest

# Nunca abrir la base configurada en .env para esta prueba.
os.environ['DATABASE_URL'] = 'sqlite://'

from fastapi import FastAPI
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.core.database import Base, get_db
from app.api.endpoints.matriz_riesgos import router


class MatrizIdsTest(unittest.TestCase):
    def setUp(self):
        self.engine = create_engine('sqlite://', connect_args={'check_same_thread': False},
                                    poolclass=StaticPool)
        Base.metadata.create_all(self.engine)
        factory = sessionmaker(bind=self.engine)

        def db_override():
            with factory() as db:
                yield db

        app = FastAPI()
        app.include_router(router, prefix='/api/matriz-riesgos')
        app.dependency_overrides[get_db] = db_override
        self.client = TestClient(app)

    def tearDown(self):
        self.client.close()
        self.engine.dispose()

    def test_integer_id_through_create_list_read_update_delete(self):
        created = self.client.post('/api/matriz-riesgos/', json={
            'codigo': 'TEST-001', 'riesgo': 'Riesgo ficticio',
            'probabilidad_valor': 2, 'impacto_valor': 3,
        })
        self.assertEqual(created.status_code, 200, created.text)
        record_id = created.json()['id']
        self.assertIs(type(record_id), int)
        listed = self.client.get('/api/matriz-riesgos/')
        self.assertEqual(listed.status_code, 200, listed.text)
        self.assertEqual(listed.json()[0]['id'], record_id)
        path = f'/api/matriz-riesgos/{record_id}'
        detail = self.client.get(path)
        self.assertEqual(detail.status_code, 200, detail.text)
        self.assertEqual(detail.json()['id'], record_id)
        updated = self.client.put(path, json={'descripcion': 'Texto actualizado'})
        self.assertEqual(updated.status_code, 200, updated.text)
        self.assertEqual(updated.json()['descripcion'], 'Texto actualizado')
        deleted = self.client.delete(path)
        self.assertEqual(deleted.status_code, 200, deleted.text)
        self.assertEqual(deleted.json()['id'], record_id)
        self.assertEqual(self.client.get(path).status_code, 404)

    def test_uuid_is_rejected_for_integer_primary_key(self):
        for method in ('get', 'put', 'delete'):
            with self.subTest(method=method):
                response = self.client.request(method.upper(),
                    '/api/matriz-riesgos/00000000-0000-0000-0000-000000000001',
                    **({'json': {}} if method == 'put' else {}))
                self.assertEqual(response.status_code, 422)
