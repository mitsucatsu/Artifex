from django.contrib import admin
from store.models import Product, Order, OrderItem, ShippingAddress, Review

admin.site.register(Product)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(ShippingAddress)
admin.site.register(Review)
