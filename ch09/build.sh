#!/bin/bash

# # depswriter.py
# python closure-library/closure/bin/build/depswriter.py \
#   --root_with_prefix="scripts ../../../scripts" \
#   --output_file=deps.js

# closurebuilder.py
python closure-library/closure/bin/build/closurebuilder.py \
  --root=closure-library \
  --root=scripts \
  --namespace="tinyword.App" \
  --output_mode=compiled \
  --compiler_jar=compiler.jar \
  --compiler_flags="--compilation_level=ADVANCED_OPTIMIZATIONS" \
  --compiler_flags="--jscomp_error=checkTypes" \
  --output_file=script.js
