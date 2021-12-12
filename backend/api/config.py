import os
basedir = os.path.abspath(os.path.dirname(__file__))
postgres_local_base = 'postgresql://zdggreuexjnlru:69138a64823753e3f9fbe1341a8624eaeb896f6d2cdcc4fba4674a0aa7e62a62@ec2-44-198-196-169.compute-1.amazonaws.com:5432/'
database_name = 'dbkf8v0nmr5a0e'

class Config:
    DEBUG = False
    TESTING = False
    CSRF_ENABLED = True
    SQLALCHEMY_DATABASE_URI = postgres_local_base + database_name

class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = postgres_local_base + database_name

class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = postgres_local_base + database_name

config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'default': DevelopmentConfig
}
