###############################################################################
# Caleydo - Visualization for Molecular Biology - http://caleydo.org
# Copyright (c) The Caleydo Team. All rights reserved.
# Licensed under the new BSD license, available at http://caleydo.org/license
###############################################################################
from __future__ import with_statement, print_function
from setuptools import setup, find_packages
from codecs import open
from os import path

here = path.abspath(path.dirname(__file__))


def read_it(name):
  with open(path.join(here, name), encoding='utf-8') as f:
    return f.read()


# read package.json information
with open(path.join(here, 'package.json'), encoding='utf-8') as json_data:
  import json

  pkg = json.load(json_data)


def packaged(*files):
  r = {}
  global pkg
  r[pkg['name'].encode('ascii')] = list(files)
  return r


def requirements(file):
  return [r.strip().encode('ascii') for r in read_it(file).strip().split('\n') if not r.startswith('-e git+https://')]


def to_version(v):
  import datetime
  now = datetime.datetime.utcnow()
  return v.replace('SNAPSHOT', now.strftime('%Y%m%d-%H%M%S'))

setup(
  name=pkg['name'].lower(),
  version=to_version(pkg['version']),
  url=pkg['homepage'],
  description=pkg['description'],
  long_description=read_it('README.md'),
  keywords=pkg.get('keywords', ''),
  author=pkg['author']['name'],
  author_email=pkg['author']['email'],
  license=pkg['license'],
  zip_safe=False,

  entry_points={
    'phovea.registry': ['{0} = {0}:phovea'.format(pkg['name'])],
    'phovea.config': ['{0} = {0}:phovea_config'.format(pkg['name'])]
  },

  # See https://pypi.python.org/pypi?%3Aaction=list_classifiers
  classifiers=[
    'Intended Audience :: Developers',
    'Operating System :: OS Independent',
    # Pick your license as you wish (should match "license" above)
    'License :: OSI Approved :: ' + ('BSD License' if pkg['license'] == 'BSD-3-Clause' else pkg['license']),
    'Programming Language :: Python',
    'Programming Language :: Python :: 2.7',
    'Programming Language :: Python :: 3.4'
  ],

  # You can just specify the packages manually here if your project is
  # simple. Or you can use find_packages().
  packages=find_packages(exclude=['docs', 'tests*']),

  # List run-time dependencies here.  These will be installed by pip when
  # your project is installed. For an analysis of "install_requires" vs pip's
  # requirements files see:
  # https://packaging.python.org/en/latest/requirements.html
  install_requires=requirements('requirements.txt'),
  tests_require=requirements('requirements_dev.txt'),

  # If there are data files included in your packages that need to be
  # installed, specify them here.  If using Python 2.6 or less, then these
  # have to be included in MANIFEST.in as well.
  package_data=packaged('config.json', 'buildInfo.json'),

  # Although 'package_data' is the preferred approach, in some case you may
  # need to place data files outside of your packages. See:
  # http://docs.python.org/3.4/distutils/setupscript.html#installing-additional-files # noqa
  # In this case, 'data_file' will be installed into '<sys.prefix>/my_data'
  data_files=[]  # [('my_data', ['data/data_file'])],
)
