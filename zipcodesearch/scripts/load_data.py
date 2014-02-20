import csv
from zipcodesearch.zipcode.models import Zipcode
with open('scripts/postcode.csv') as csvfile:
    reader = csv.reader(csvfile, delimiter=";")
    error = []
    for idx, row in enumerate(reader):
        try:
            obj, created = Zipcode.objects.get_or_create(
                    zipcode=row[0],
                    street=row[1],
                    city=row[2],
                    state=row[3],
                )
            print "{}: {}".format(idx, obj)
        except Exception as e:
            print "Error: {}".format(e)
            error.append((idx, e))
            continue
    for idx, err in error:
        print "{}: {}".format(idx, err)
