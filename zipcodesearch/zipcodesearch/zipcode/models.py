from django.db import models
from django.utils.translation import ugettext_lazy as _

# Create your models here.
class Zipcode(models.Model):
    STATES = (
        ("PLS", "Perlis"),
        ("KDH", "Kedah"),
        ("PNG", "Penang"),
        ("KTN", "Kelantan"),
        ("TRG", "Terengganu"),
        ("PHG", "Pahang"),
        ("PRK", "Perak"),
        ("SGR", "Selangor"),
        ("KUL", "Kuala Lumpur"),
        ("NSN", "Negeri Sembilan"),
        ("MLK", "Malacca"),
        ("JHR", "Johor"),
        ("SBH", "Sabah"),
        ("SRW", "Sarawak"),
        ("PJY", "Putrajaya"),
        )
    zipcode = models.CharField(_("Zipcode"), max_length=10)
    street = models.CharField(_("Street"), max_length=255)
    city = models.CharField(_("City"), max_length=255)
    state = models.CharField(_("State"), max_length=3, choices=STATES)

    def __unicode__(self):
        return "{} - {}".format(self.zipcode, self.state)

    class Meta:
        unique_together = ('zipcode', 'street', 'city', 'state')
        ordering = ('state','city')
