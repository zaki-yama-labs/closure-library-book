#!/bin/bash

# # depswriter.py
python closure-library/closure/bin/build/depswriter.py \
  --root_with_prefix="scripts ../../../scripts" \
  --output_file=deps.js

# closurebuilder.py
# python closure-library/closure/bin/build/closurebuilder.py \
#   -n chapter2.App -o script --output_file=script.js \
#   --root=closure-library --root=scripts