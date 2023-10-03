{
  description = "Floral Recipes";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, flake-utils, nixpkgs }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
        };
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = [
            pkgs.nodejs_18
            pkgs.postgresql_16
          ];

          shellHook = ''
            export PGHOST=$(pwd)/.db/postgres
            export PGDATA=$PGHOST/data
            export PGDATABASE=postgres
            export PGLOG=$PGHOST/postgres.log

            alias p="psql -U postgres -p 5444"

            mkdir -p $PGHOST

            if [ ! -d $PGDATA ]; then
              initdb \
              --auth=trust \
              --auth-host=trust \
              --auth-local=trust \
              --no-locale \
              --encoding=UTF8 \
              --username=postgres \
              --set port=5444
            fi

            if ! pg_ctl status
            then
              echo "Starting with log file: $PGLOG"
              pg_ctl start -l $PGLOG -o "--unix_socket_directories='$PGHOST'"
            fi

            DBNAME="floralrecipes"

            psql -U postgres -p 5444 -tc "SELECT 1 FROM pg_database WHERE datname = '$DBNAME'" | grep -q 1 | psql -U postgres -p 5444 -c "CREATE DATABASE $DBNAME"
          '';
        };
      }
    );
}
