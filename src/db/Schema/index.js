/**
 * Data Studio by Eviratec
 * Copyright (c) 2017 - 2019 Callan Peter Milne
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
 * REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
 * AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
 * INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
 * LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
 * OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
 * PERFORMANCE OF THIS SOFTWARE.
 */


module.exports = function Schema (db) {

  const bookshelf = db._bookshelf;

  let Schema = bookshelf.Model.extend({
    tableName: 'app_schemas',
    constructor: function() {
      bookshelf.Model.apply(this, arguments);
      this.on('saving', function(model, attrs, options) {
        options.query.where('Id', '=', model.get("Id"));
      });
    },
    App: function() {
      return this.belongsTo(db.App, "AppId", "Id");
    },
    Properties: function() {
      return this.hasMany(db.Property, "Id", "SchemaId")
        .query(function(qb) {
          qb.whereNull('Deleted');
        });
    },
  });

  db.Schema = Schema;

  function fetchSchemaById (id) {
    return new Promise((resolve, reject) => {
      Schema.where({"Id": id})
        .fetch({withRelated: ["App", "Properties"]})
        .then(resolve)
        .catch(reject);
    });
  };

  db.fetchSchemaById = fetchSchemaById;

  function fetchSchemasByAppId (appId) {
    return new Promise((resolve, reject) => {
      Schema.where({"AppId": appId, "Deleted": null})
        .fetchAll()
        .then(resolve)
        .catch(reject);
    });
  }

  db.fetchSchemasByAppId = fetchSchemasByAppId;

  function fetchSchemaById (id) {
    return new Promise((resolve, reject) => {
      Schema.where({"Id": id, "Deleted": null})
        .fetch()
        .then(resolve)
        .catch(reject);
    });
  }

  db.fetchSchemaById = fetchSchemaById;

};
