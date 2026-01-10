"""
ATHLYNX AI Platform - Routers Package
All API routers for the platform
"""
from . import auth
from . import verification
from . import waitlist
from . import vip
from . import feed
from . import athlete
from . import social
from . import messages
from . import notifications
from . import transfer_portal
from . import crm
from . import stripe_router

__all__ = [
    "auth",
    "verification",
    "waitlist",
    "vip",
    "feed",
    "athlete",
    "social",
    "messages",
    "notifications",
    "transfer_portal",
    "crm",
    "stripe_router",
]
