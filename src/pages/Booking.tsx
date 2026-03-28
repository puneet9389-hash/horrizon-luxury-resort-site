import React, { useState, useEffect } from 'react'
import {
  Page,
  PageHeader,
  PageTitle,
  PageBody,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Input,
  Field,
  FieldLabel,
  FieldDescription,
  EmptyState,
  toast,
} from '@blinkdotnew/ui'
import { Calendar, Users, Package, CreditCard, CheckCircle, MessageSquare } from 'lucide-react'
import { usePackages } from '@/hooks/usePackages'
import { useBookings } from '@/hooks/useBookings'
import { useAuth } from '@/hooks/useAuth'
import { useSearch } from '@tanstack/react-router'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function BookingPage() {
  const { listPackages } = usePackages()
  const { createBooking } = useBookings()
  const { user } = useAuth()
  const search = useSearch({ from: '/booking' })

  const [selectedPackageId, setSelectedPackageId] = useState<string>((search as any).packageId || '')
  const [checkIn, setCheckIn] = useState<string>('')
  const [checkOut, setCheckOut] = useState<string>('')
  const [guests, setGuests] = useState<number>(2)
  const [totalPrice, setTotalPrice] = useState<number>(0)

  const selectedPackage = listPackages.data?.find((p: any) => p.id === selectedPackageId)

  useEffect(() => {
    if (selectedPackage && checkIn && checkOut) {
      const start = new Date(checkIn)
      const end = new Date(checkOut)
      const nights = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)))
      setTotalPrice(selectedPackage.price * nights * (guests > 2 ? 1.2 : 1))
    }
  }, [selectedPackage, checkIn, checkOut, guests])

  const handleBooking = async () => {
    if (!selectedPackageId || !checkIn || !checkOut) {
      toast.error('Missing details', { description: 'Please fill in all the booking information.' })
      return
    }
    try {
      await createBooking.mutateAsync({
        packageId: selectedPackageId,
        customerName: user?.displayName || 'Guest',
        customerPhone: 'N/A',
        bookingDate: checkIn,
        guestCount: guests,
        totalPrice,
        status: 'confirmed',
      })
      toast.success('Booking Confirmed!', {
        description: `You've successfully booked the ${selectedPackage?.name} package.`,
      })
    } catch {
      toast.error('Booking failed', { description: 'Something went wrong while processing your request.' })
    }
  }

  const openWhatsApp = () => {
    const text = `Hi, I'm interested in booking the ${selectedPackage?.name} package for ${guests} guests starting from ${checkIn}.`
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(text)}`, '_blank')
  }

  return (
    <div style={{ background: '#0A0A0A' }}>
      <Navbar />
      <div className="pt-20">
        <Page>
          <PageHeader>
            <PageTitle className="font-serif text-4xl text-white">Reserve Your Escape</PageTitle>
          </PageHeader>
          <PageBody>
            <div className="grid lg:grid-cols-5 gap-12 py-12">
              <div className="lg:col-span-3 space-y-12">
                <Card className="border-border/50 bg-card/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="p-2 bg-primary/10 text-primary rounded-lg">
                        <Package className="h-5 w-5" />
                      </div>
                      Package Selection
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      {listPackages.data?.map((pkg: any) => (
                        <div
                          key={pkg.id}
                          className={`p-6 rounded-2xl border-2 transition-all cursor-pointer ${
                            selectedPackageId === pkg.id
                              ? 'border-primary bg-primary/5 ring-4 ring-primary/5'
                              : 'border-border bg-background hover:border-primary/50'
                          }`}
                          onClick={() => setSelectedPackageId(pkg.id)}
                        >
                          <h3 className="font-bold text-lg mb-1">{pkg.name}</h3>
                          <p className="text-primary font-bold text-xl mb-3">
                            ₹{pkg.price}
                            <span className="text-xs text-muted-foreground font-normal"> / night</span>
                          </p>
                          <p className="text-xs text-muted-foreground line-clamp-2">{pkg.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/50 bg-card/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="p-2 bg-primary/10 text-primary rounded-lg">
                        <Calendar className="h-5 w-5" />
                      </div>
                      Stay Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <Field>
                        <FieldLabel>Check-in Date</FieldLabel>
                        <Input
                          type="date"
                          value={checkIn}
                          onChange={(e) => setCheckIn(e.target.value)}
                          className="h-12"
                        />
                      </Field>
                      <Field>
                        <FieldLabel>Check-out Date</FieldLabel>
                        <Input
                          type="date"
                          value={checkOut}
                          onChange={(e) => setCheckOut(e.target.value)}
                          className="h-12"
                        />
                      </Field>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                      <Field>
                        <FieldLabel>Guest Count</FieldLabel>
                        <Input
                          type="number"
                          min={1}
                          max={10}
                          value={guests}
                          onChange={(e) => setGuests(parseInt(e.target.value))}
                          className="h-12"
                        />
                        <FieldDescription>Extra charges apply for 3+ guests</FieldDescription>
                      </Field>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-2">
                <div className="sticky top-24 space-y-6">
                  <Card className="border-primary/20 bg-primary/5 shadow-2xl overflow-hidden">
                    <div className="h-2 bg-primary w-full" />
                    <CardHeader>
                      <CardTitle className="font-serif">Reservation Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {selectedPackage ? (
                        <>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm border-b border-primary/10 pb-4">
                              <span className="text-muted-foreground">Package</span>
                              <span className="font-bold">{selectedPackage.name}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm border-b border-primary/10 pb-4">
                              <span className="text-muted-foreground">Dates</span>
                              <span className="font-bold">
                                {checkIn || '---'} to {checkOut || '---'}
                              </span>
                            </div>
                            <div className="flex justify-between items-center text-sm border-b border-primary/10 pb-4">
                              <span className="text-muted-foreground">Guests</span>
                              <span className="font-bold">{guests} Adults</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center pt-4">
                            <span className="text-lg font-serif italic text-primary">Total Amount</span>
                            <div className="text-right">
                              <span className="text-3xl font-bold">₹{totalPrice.toLocaleString()}</span>
                              <p className="text-xs text-muted-foreground">Incl. all taxes</p>
                            </div>
                          </div>
                          <div className="space-y-3 pt-6">
                            <Button
                              className="w-full h-14 text-lg font-bold gap-2 rounded-xl shadow-lg shadow-primary/20"
                              onClick={handleBooking}
                              disabled={!selectedPackageId || !checkIn || !checkOut}
                            >
                              Confirm &amp; Book <CheckCircle className="h-5 w-5" />
                            </Button>
                            <Button
                              variant="outline"
                              className="w-full h-12 gap-2 border-primary/20 text-primary hover:bg-primary/5"
                              onClick={openWhatsApp}
                            >
                              <MessageSquare className="h-4 w-4" /> Chat to Confirm
                            </Button>
                          </div>
                        </>
                      ) : (
                        <EmptyState
                          icon={<Package />}
                          title="No package selected"
                          description="Select a package from the left to see your booking summary."
                        />
                      )}
                    </CardContent>
                  </Card>

                  <div className="p-6 rounded-2xl bg-muted border border-border/50">
                    <div className="flex items-center gap-3 mb-4">
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                      <span className="font-bold text-sm">Flexible Payment</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Book now and pay at the resort. We offer free cancellation up to 48 hours before check-in.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </PageBody>
        </Page>
      </div>
      <Footer />
    </div>
  )
}
